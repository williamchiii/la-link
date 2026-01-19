import url from "../models/url.js"
import genShortCode from "../utils/genShortCode.js"

//CREATE: create a new shortened URL
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
        //return the created link
        res.status(201).json(newLink);
    } catch(error){
        res.status(500).json({error: "Failed to create shortLink"})
    }
};
export async function redirectShortLink() {
    try{

    } catch(error){
        
    }
};
export async function getShortLink() {
    try{

    } catch(error){
        
    }
};
export async function updateShortLink() {
    try{

    } catch(error){
        
    }
};
export async function deleteLink() {
    try{

    } catch(error){
        
    }
};
export async function getLinkStats() {
    try{

    } catch(error){
        
    }
};