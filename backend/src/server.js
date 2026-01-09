//this is the thing that runs (essential a main file)

import express from "express";
import { connectDB } from "../config/database.js"

const app = express();
const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`)
});