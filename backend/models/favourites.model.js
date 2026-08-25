import mongoose from "mongoose";
import { Schema } from "mongoose";

const favouriteSchema = new Schema({
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        products:{
            type:Object
        }
});

export const Favourites= mongoose.model("Favourites", favouriteSchema);