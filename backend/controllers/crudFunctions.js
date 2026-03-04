import url from "../models/url.js"
import genShortCode from "../utils/genShortCode.js"
import { redis } from "../config/redis.js"

const CACHE_TTL = 60 * 60 * 24 * 30 //TTL in cacche for 30 days (seconds format)

//CREATE: create a new shortened URL and load it into cache
//Route: POST /api/links
export async function createShortLink(req, res) {
    try{
        //extract the long url from the request body
        //req.body is extracted from the form input in express
        const {longURL} = req.body;
        //validate the input
        if (!longURL){
            return res.status(400).json({error: "longURL is required"});
        }
        //generate a unique short code
        const shortCode = await genShortCode(url);
        //build full shortURL using .env variable
        const shortURL = `${process.env.BASE_URL}/${shortCode}`;
        //save the new link in MongoDB
        const newLink = await url.create({
            longURL,
            shortCode,
            shortURL,
            createdBy: req.user?.id || null,
        });
        //pre-warm the cache so first click is a cache hit
        await redis.set(`link:${shortCode}`, longURL, { ex: CACHE_TTL})
        //return the created link
        res.status(201).json(newLink);
    } catch(error){
        res.status(500).json({error: "Failed to create shortLink"})
    }
};

//REDIRECT: redirect short link and increment clicks
//Route: GET /:shortCode
export async function redirectShortLink(req, res, next) {
    try{
        const shortCode = req.params.shortCode;
        //check cache hit
        const cached = await redis.get(`link:${shortCode}`)
        //cache hit
        if (cached){
            url.updateOne({shortCode}, { $inc: {clicks: 1}}).catch(() => {})  //clicks++ on MongoDB
            redis.expire(`link:${shortCode}`, CACHE_TTL).catch(() => {}) //reset cache TTL timer
            return res.redirect(cached)
        }
        //cache miss
        //find link and increment clicks
        const link = await url.findOneAndUpdate(
            {shortCode},
            {$inc: {clicks:1}},
            {new:true} //returns updated doc instead of old one
        );
        if (!link){
            return res.status(404).json({error: "Short link not found. Make sure the long link is valid"});
        }
        //redirect to original long URL
        await redis.set(`link:${shortCode}`, link.longURL, { ex: CACHE_TTL })
        res.redirect(link.longURL);
    } catch(error){
        res.status(500).json({error: "Redirect failed"});
    }
};

//READ: get one short link by shortCode
//Route: GET /api/links/:shortCode
export async function getShortLink(req, res) {
    try{
        const {shortCode} = req.params;
        const link = await url.findOne({shortCode});
        if(!link){
            return res.status(404).json({error: "Link not found"});
        }
        res.json(link);
    } catch(error){
        res.status(500).json({error: "Failed to fetch link"})
    }
};

//DELETE: delete a short link
//Route: DELETE /api/links/:id
export async function deleteLink(req, res) {
    try{
        const {id} = req.params;
        //delete link by mongoDB document ID
        const deletedLink = await url.findByIdAndDelete(id);
        if(!deletedLink){
            return res.status(404).json({error: "link to delete not found"});
        }
        await redis.del(`link:${deletedLink.shortCode}`) //invalidate cache
        //confirm deletion
        res.json({message: "link deleted successfully"});
    } catch(error){
        res.status(500).json({error:"Failed to delete link"});
    }
};

//STATS: get stats for a short link
//Route: GET /api/links/:shortCode/stats
export async function getLinkStats(req, res) {
    try{
        const {shortCode} = req.params;
        //find link by shortCode
        const link = await url.findOne({shortCode});
        
        if(!link){
            return res.status(404).json({error: "link not found"});
        }
        //return only stats related data
        res.json({
            shortURL: link.shortURL,
            longURL: link.longURL,
            clicks: link.clicks,
            createdAt: link.createdAt,
            updatedAt: link.updatedAt,
        });
    } catch(error){
        res.status(500).json({error: "Failed to fetch link stats"})
    }
};