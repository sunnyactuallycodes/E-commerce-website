import e, { response } from "express";
import { asyncHandler } from "../utility/asyncHandler.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { getDistanceInKm, isWithin40Km, getTotalCartPrice } from "../utility/priceCalculator.js";


export const createOrder= asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"Please login to create your first order",
            success:false
        });
        const {lat, lng}= request.params; 
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

        console.log(lat, lng);
        if(!lat || !lng) return response.json({
            message:'no such location founded, please try again',
            success:false
        });
        const distance = getDistanceInKm(20,20, lat, lng);
        if(!distance) return response.json({
            message:"not able to calculate the distance ",
            success:false
        });
        const shippingCharges= isWithin40Km(20,20,lat, lng);
        console.log(shippingCharges);
        if(!shippingCharges) return response.json({
            message:"not able to fetch the shipping charges",
            success:false
        });
        let priceExcludingShipmentCharges = 0;
        await getTotalCartPrice(request.session.user).then((response)=>{
           priceExcludingShipmentCharges= Number(response);
        });
        console.log(priceExcludingShipmentCharges);

        console.log('Your price is: ',priceExcludingShipmentCharges);
        if(!priceExcludingShipmentCharges) return response.json({
            message:"No price available, try after some time",
            success:false
        });
        const price = priceExcludingShipmentCharges+ shippingCharges;
        console.log(price);
        if(!price) return response.json({
            message:"price is not fetched successfully, try again later",
            success:false
        });


        const {firstName,
               lastName,
               email,
               phoneNumber,
               address,
               city,
               pincode,
               state,
               address1 
        } = request.body;
        if(!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim() || !address.trim() || !city.trim() || !pincode.trim() || !state.trim()) return response.json({
            message:"please fill all the fields correctly",
            success:false
        });
        const cartItems = await Cart.find({user:request.session.user});
        if(!cartItems) return response.json({
            message:"No such cart is there with your account, please create one",
            success:false
        });
        const order = await Order.create({
            firstName,
            lastName,
            city,
            address,
            state,
            pincode,
            email,
            phoneNumber,
            user:request.session.user,
            deliveryDate:"7 days from ordering",
            price,
            cartProducts:cartItems,
            shippingPrice:shippingCharges || 299,
            address1
        });
        if(!order) return response.json({
            message:"there is an error while creating your order, please try again",
            success:false
        });
        order.save();
        return response.json({
            message:"Your order is successfully created",
            success:true
        });
    } catch (error) {
        console.error("there is an internal server error while creating your order: ", error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});


export const onlyShippingCharges = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"Please login first",
            success:false
        });
        const {lat,lng}=request.params;
        console.log(lat, lng);
        if(!lat || !lng) return response.json({
            message:'no such location founded, please try again',
            success:false
        });
        const distance = getDistanceInKm(20,20, lat, lng);
        if(!distance) return response.json({
            message:"not able to calculate the distance ",
            success:false
        });
        console.log(distance);
        const shippingCharges= isWithin40Km(20,20,lat, lng) || 299;
        console.log(shippingCharges);
        if(!shippingCharges) return response.json({
            message:"not able to fetch the shipping charges",
            success:false
        });
        let priceExcludingShipmentCharges = 0;
        await getTotalCartPrice(request.session.user).then((response)=>{
           priceExcludingShipmentCharges= Number(response);
        });
        console.log(priceExcludingShipmentCharges);

        console.log('Your price is: ',priceExcludingShipmentCharges);
        if(!priceExcludingShipmentCharges) return response.json({
            message:"No price available, try after some time",
            success:false
        });
        const price = priceExcludingShipmentCharges+ shippingCharges;
        console.log(price);
        return response.json({
             charges: shippingCharges|| 299,
             success:true,
             price:price,
             subTotal: priceExcludingShipmentCharges
        });
    } catch (error) {
        console.error("there is an internal server error while fetching your shipping price");
        return response.json({
            message:"Please provide the latitude and longitude",
            success:false
        })
    }
});

export const fetchingOrders = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"please login to see your orders",
            success:false
        });
        const order = await Order.find({user:request.session.user});
        if(!order) return response.json({
            message:"No such orders found, please create one",
            success:false
        });
        console.log(order);
        return response.json({
            data:order,
            success:true
        });
    } catch (error) {
        console.error("there is no internal server error: ", error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});

export const fetchAllOrders = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"Please login as admin",
            success:false
        });
        const findedOrders = await Order.find();
        if(!findedOrders) return response.json({
            message:"no such orders founded, please place an order", 
            success:false
        });
        return response.json({
            data:findedOrders,
            success:true
        });   
    } catch (error) {
        console.error("There is an error while fetching your orders as admin: ", error);
        return response.json({
            message:"Please login as admin to access your packages",
            success:false
        })
    }
});


export const updateDateForDelivery = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"please login again",
            success:false
        });
        const {orderId}= request.params;
        const {date}= request.body;
        console.log(date);
        if(!orderId) return response.json({
            message:"No such order is there in db",
            success:false
        });
        if(!date) return response.json({
            message:"Please insert the date of the order",
            success:false
        })
        const updatingOrder= await Order.findById(orderId);
        console.log(updatingOrder);
        if(!updatingOrder) return response.json({
            message:"Please place an order to begin",
            success:false
        });
        const newDate =await updatingOrder.updateOne({$set:{deliveryDate:date}});
        if(!newDate) return response.json({
            message:"no such orders", 
            success:false
        });
        return response.json({
            message:"Date successfully changed",
            success:true
        })

    } catch (error) {
        console.error("There is an error while updating the delivery date: ", error);
        return response.json({
            message:"Internal server Error",
            success:false
        })
    }
});


export const payingViaCashOnDelivery = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"Please login to create your first order",
            success:false
        });
        const {lat, lng}= request.params; 
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
        console.log(lat, lng);
        if(!lat || !lng) return response.json({
            message:'no such location founded, please try again',
            success:false
        });
        const distance = getDistanceInKm(20,20, lat, lng);
        if(!distance) return response.json({
            message:"not able to calculate the distance ",
            success:false
        });
        const shippingCharges= isWithin40Km(20,20,lat, lng);
        console.log(shippingCharges);
        if(!shippingCharges) return response.json({
            message:"not able to fetch the shipping charges",
            success:false
        });
        let priceExcludingShipmentCharges = 0;
        await getTotalCartPrice(request.session.user).then((response)=>{
           priceExcludingShipmentCharges= Number(response);
        });
        console.log(priceExcludingShipmentCharges);

        console.log('Your price is: ',priceExcludingShipmentCharges);
        if(!priceExcludingShipmentCharges) return response.json({
            message:"No price available, try after some time",
            success:false
        });
        const price = priceExcludingShipmentCharges+ shippingCharges;
        console.log(price);
        if(!price) return response.json({
            message:"price is not fetched successfully, try again later",
            success:false
        });
        const {firstName,
               lastName,
               email,
               phoneNumber,
               address,
               city,
               pincode,
               state,
               address1 
        } = request.body;
        if(!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim() || !address.trim() || !city.trim() || !pincode.trim() || !state.trim()) return response.json({
            message:"please fill all the fields correctly",
            success:false
        });
        const cartItems = await Cart.find({user:request.session.user});
        if(!cartItems) return response.json({
            message:"No such cart is there with your account, please create one",
            success:false
        });
        const order = await Order.create({
            firstName,
            lastName,
            city,
            address,
            state,
            pincode,
            email,
            phoneNumber,
            user:request.session.user,
            deliveryDate:"7 days from ordering",
            price,
            cartProducts:cartItems,
            shippingPrice:shippingCharges || 299,
            address1,
            paymentMode:'cashOnDelivery',
            paymentOrderId:"Cod12314",
            paymentStatus:"Pending",
            paidAt:new Date()
        });
        if(!order) return response.json({
            message:"there is an error while creating your order, please try again",
            success:false
        });
        order.save();
        return response.json({
            message:"Your order is successfully created",
            success:true
        });
    } catch (error) {
        console.error("there is an internal server error while creating your order: ", error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});