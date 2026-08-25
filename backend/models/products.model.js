import { Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema({
    productName:{
        type:String,
        
    },
    brandName:{
        type:String,
        
    },
    productDescription:{
        type:String,
     
    },
    productSize:{
        type:Array,
   
    },
    Price:{
        type:Number,
       
    },
    quantity:{
        type:Number,
       
    },
    productImages:{
        type:Array
    },
    favourites:{
        type:Boolean,
        default:false
    },
    category:{
        type:String,
      
    },
    productDetails:{
        type:Array,
     
    }
});
export const Product = mongoose.model('Product', productSchema);