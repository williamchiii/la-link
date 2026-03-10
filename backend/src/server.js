//this is the thing that runs (essential a main file)
import dotenv from "dotenv";
import express from "express";
import linkRoutes from "../routes/linkRoutes.js"
import logger from "../utils/logger.js"
import { connectDB } from "../config/database.js";
import cors from "cors";
import path from "path";
import rateLimiter from "../middlewares/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//parse JSON bodies
app.use(express.json());

//allows CORS if not in production
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    }));
}

//rate limiter middleware only to api routes
app.set("trust proxy", true);
app.use("/api", rateLimiter);

//register routes
app.use(linkRoutes);

//use this if its in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); //serve optimized react app
    //if we have anything other than our api routes, let react handle it
    app.use((req,res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}


//connect to database then start server
connectDB().then(() => {
    app.listen(PORT, () => {
    logger.info(`Server started on PORT: ${PORT}`)
    })
});