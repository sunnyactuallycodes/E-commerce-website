import e from "express";
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { asyncHandler } from '../utility/asyncHandler.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { request } from "http";
import { Order } from "../models/order.model.js";


dotenv.config();


const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.RAZORPAY_SECRET
});

export const createOrderForPayment = asyncHandler(async(request,response)=>{
    const {price}= request.body;
    const options = {
        amount:price*100,
        currency:'INR',
        receipt:`receipt_${Date.now()}`
    };

    try { 
        const order = await razorpay.orders.create(options);
        if(!order) return response.status(404).json({data:"no order is made"});
        return response.status(201).json(order);

    } catch (error) {
        console.error("there is an error while creating the order in razorpay: ", error);
        response.status(404).json({message:"Please check again"})
    }
});


export const verifyPayment = asyncHandler(async(request, response)=>{
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature}= request.body;
        console.log("this call is right happening");

        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const secret = "mn27mb5S2aTFotJ7Vx9726yl";
        const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');


        if (expectedSignature === razorpay_signature){
            console.log("Order successfull till here");
            const foundOrder = await Order.findOne({user:request.session.user}).select('price');
            if(!foundOrder) return response.json({
                message:"please create your first cart to begin",
                success:false
            });
            const finalAmount = foundOrder.price; 
            console.log(finalAmount);
            if(!finalAmount) return response.json({
                message:"Not able to fetch the amount",
                success:false
            });
            const result = await Order.updateOne({
                user:request.session.user
            },
            {
                $set:{
                    paymentStatus:'Approved',
                    paymentId: razorpay_payment_id,
                    paymentOrderId: razorpay_order_id,
                    price:finalAmount,
                    paidAt:new Date(),
                    paymentMode:'razorpay'
                }
            }
        );
        console.log("your result is right here: ", result);
        if(!result) return response.json({
            message:"Please try again the server is down",
            success:false
        });

        return response.json({
            success:true,
            message:"Your payment is successfull, embark on a new journey with us",
            result
        });
        }
    } catch (error) {
        console.error("there is an internal server error while verifying your payment you may wait for some time: ", error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })

    }
})
