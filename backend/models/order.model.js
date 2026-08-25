import { Schema } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    pincode:{
        type:Number 
    },
    state:{
        type:String
    },
    // cartId:{
    //     type:Schema.Types.ObjectId,
    //     ref:"Cart"
    // },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    price:{
        type:Number
    },
    shippingPrice:{
        type:Number
    },
    deliveryDate:{
        type:String
    },
    cartProducts:{
        type:Array
    },
    paymentStatus: {
        enum:['Approved', 'Pending', 'Cancelled'],
        type:String,
        default:'Cancelled'
    },
    paymentId:{
        type:String
    },
    paymentOrderId:{
        type:String
    },
    paidAt:{
        type:Date
    },
    address1:{
        type:String
    },
    paymentMode:{
        enum:['cashOnDelivery','razorpay','none'],
        type:String,
        default:'none'
    }
});
export const Order = mongoose.model("Order", orderSchema);