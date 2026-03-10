import ratelimit from "../config/redis.js"

const rateLimiter = async(req, res, next) => {
    try{
        //each ip has its own rate limit, in future date have ip or user depending on login or not
        const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress
        const {success} = await ratelimit.limit(ip)
        if(!success){
            return res.status(429).json({error: "Too many requests. Please try again later."});
        }
        //if under the rate limit continue to next middleware
        next()
    } catch(error){
        logger.warning("rate limit error")
        //pass error to Express's global error handler
        next(error)
    }
}

export default rateLimiter