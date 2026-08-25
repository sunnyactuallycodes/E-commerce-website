import { Schema } from "mongoose";
import mongoose from "mongoose";

const googleSchema = new Schema(
    {
        googleId:{
            type:String
        },
        username:{
            type:String
        },
        email:{
            type:Array
        }
    }
);
export const Google = mongoose.model("Google", googleSchema);