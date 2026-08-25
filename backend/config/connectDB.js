import mongoose from "mongoose";
import { asyncHandler } from "../utility/asyncHandler.js";
import { configDotenv } from "dotenv";

configDotenv();

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("you are succesfully connected");
        
    } catch (error) {
        console.error("An error occured while connecting to the database: ",error);
        process.exit(1);
    }
};
export default connectDB;