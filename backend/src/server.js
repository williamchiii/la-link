//this is the thing that runs (essential a main file)
import dotenv from "dotenv";
import express from "express";
import linkRoutes from "../routes/linkRoutes.js"
import { connectDB } from "../config/database.js";

dotenv.config();

const app = express();

//connect to database
connectDB();

//parse JSON bodies
app.use(express.json());

//register routes
app.use(linkRoutes);

//start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`)
});