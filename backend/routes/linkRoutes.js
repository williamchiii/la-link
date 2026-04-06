import express from "express";
import {strictRateLimiter, generousRateLimiter} from "../middlewares/rateLimiter.js";
import { authenticateUser } from "../middlewares/auth.js";
import {
    createShortLink,
    redirectShortLink,
    getShortLink,
    getUserLinks,
    deleteLink,
    getLinkStats,
} from "../controllers/apiEndpoints.js";

const router = express.Router();

//CREATE short link, optional auth
router.post("/api/links", strictRateLimiter, authenticateUser({ required: false }), createShortLink);

//GET link via user id, required auth
router.get("/api/links/user/me", strictRateLimiter, authenticateUser(), getUserLinks);

//READ one link, owner only
router.get("/api/links/:shortCode", strictRateLimiter, authenticateUser(), getShortLink);

//DELETE link, required auth + ownership check
router.delete("/api/links/:id", strictRateLimiter, authenticateUser(), deleteLink);

//STATS, owner only
router.get("/api/links/:shortCode/stats", strictRateLimiter, authenticateUser(), getLinkStats);

//REDIRECT (must be last). Rate limited to prevent DoS
const shortCodeRegex = /^[A-Za-z0-9_-]{6}$/;
router.get("/:shortCode", generousRateLimiter,(req, res, next) => {
    if(!shortCodeRegex.test(req.params.shortCode)){
        return next();
    }
    return redirectShortLink(req,res,next);
}); //regex validation

export default router;
