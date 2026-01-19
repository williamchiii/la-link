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
router.get("/:shortCode", redirectShortLink);

export default router;