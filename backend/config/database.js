import mongoose from "mongoose"
import dotenv from "dotenv"
import logger from "../utils/logger.js"
dotenv.config()

//connect the database
export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        logger.info("Database Successfuly Connected!")
    } catch(error){
        logger.critical("Error connecting database :(")
        process.exit(1)
    }
};
