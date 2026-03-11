import express from "express";
import {strictRateLimiter, generousRateLimiter} from "../middlewares/rateLimiter.js";
import {
    createShortLink,
    redirectShortLink,
    getShortLink,
    deleteLink,
    getLinkStats,
} from "../controllers/crudFunctions.js";

const router = express.Router();

//CREATE short link
router.post("/api/links", strictRateLimiter, createShortLink);

//READ one link
router.get("/api/links/:shortCode", strictRateLimiter, getShortLink);

//DELETE link
router.delete("/api/links/:id", strictRateLimiter, deleteLink);

//STATS
router.get("/api/links/:shortCode/stats", strictRateLimiter, getLinkStats);

//REDIRECT (must be last). Rate limited to prevent DoS
const shortCodeRegex = /^[A-Za-z0-9_-]{6}$/;
router.get("/:shortCode", generousRateLimiter,(req, res, next) => {
    if(!shortCodeRegex.test(req.params.shortCode)){
        return next();
    }
    return redirectShortLink(req,res,next);
}); //regex validation

export default router;