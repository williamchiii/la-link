import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

//connect the database
export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Successfuly Connected!")
    } catch(error){
        console.log("Error connecting database :(")
        process.exit(1)
    }
};
