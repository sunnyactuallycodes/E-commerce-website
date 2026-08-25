import { mongo, Schema } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    products:{
        type:Object
    },
    price:{
        type:Number
    },
    productSize:{
        type:Number
    },
    quantity:{
        type:Number
    },
    totalPrice:{
        type:Number
    }
});
export const Cart = mongoose.model("Cart", cartSchema);