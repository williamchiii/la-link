import { auth, LoginTicket, OAuth2Client } from "google-auth-library";
import "dotenv/config";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//stricter middleware that must have token or else hard reject
export function authenticateUser( {required = true} = {} ){
    return async(req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")){
            if (required){
                return res.status(401).json({error: "No token provided"});
            }
            return next(); //if req false continue to next middleware
        }
        //if this is reached then token is provided and required
        try{
            const token = authHeader.split(" ")[1];
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            req.user = { id: payload.sub, name: payload.name, email: payload.email }
            next();
        } catch(err){
            if (required) return res.status(401).json({error: "Invalid token"})
            next();
        }
    }
}