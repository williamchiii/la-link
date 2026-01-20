import express from "express";
import {
    createShortLink,
    redirectShortLink,
    getShortLink,
    deleteLink,
    getLinkStats,
} from "../controllers/crudFunctions.js";

const router = express.Router();

//CREATE short link
router.post("/api/links", createShortLink);

//READ one link
router.get("/api/links/:shortCode", getShortLink);

//DELETE link
router.delete("/api/links/:id", deleteLink);

//STATS
router.get("/api/links/:shortCode/stats", getLinkStats);

//REDIRECT (must be last)
const shortCodeRegex = /^[A-Za-z0-9_-]{6}$/;
router.get("/:shortCode", (req, res, next) => {
    if(!shortCodeRegex.test(req.params.shortCode)){
        return next();
    }
    return redirectShortLink(req,res,next);
}); //regex validation

export default router;