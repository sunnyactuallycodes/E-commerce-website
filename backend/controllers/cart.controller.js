import e, { request, response } from "express";
import { asyncHandler } from "../utility/asyncHandler.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/products.model.js";
import mongoose, { mongo } from "mongoose";

export const addProdcutsToCart = asyncHandler(async(request, response)=>{
    try {
        
        if(!request.session.user) return response.json({
            message:"Please login to order",
            success:false
        });
       
        const {productID}= request.params;
        const {quantity, productSize} = request.body;
        console.log(quantity, productSize, productID);
        if(!productID || !quantity || !productSize) return response.json({
            message:"Please select your product and the quantity",
            success:false
        });
        const product = await Product.findById(productID);
        if(!product) return response.json({
            message:"no such product is found",
            success:false
        });
        const newCart = await Cart.create({
            products:product,
            productSize,
            quantity,
            price:product.Price*quantity,
            user:request.session.user
        });
        if(!newCart) return response.json({
            message:"no cart is saved",
            success:false
        })
        newCart.save();
        return response.json({
            data:newCart,
            success:true,
            message:"Your cart is successfully fetched"
        });
   


    } catch (error) {
        console.error("There is an internal server error while adding products to cart: ", error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});


export const addProdcutsToCartForGoogleUser = asyncHandler(async(request, response)=>{
    try {

     if(!request.session.passport.user) return response.json({
            message:"Please login to order",
            success:false
        });
       
        const {productID}= request.params;
        const {quantity, productSize} = request.body;
        console.log(quantity, productSize, productID);
        if(!productID || !quantity || !productSize) return response.json({
            message:"Please select your product and the quantity",
            success:false
        });
        const product = await Product.findById(productID);
        if(!product) return response.json({
            message:"no such product is found",
            success:false
        });
        const newCart = await Cart.create({
            products:product,
            productSize,
            quantity,
            price:400,
            user:request.session.passport.user
        });
        if(!newCart) return response.json({
            message:"no cart is saved",
            success:false
        })
        newCart.save();
        return response.json({
            data:newCart,
            success:true,
            message:"Your cart is successfully fetched"
        });
        
    } catch (error) {
        console.error("There is an internal server error while adding products to your cart: ", error);
        return response.json({
            message:"Interal Server Error",
            success:false
        })
    }
});

export const deleteProductFromCart = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"Please login to book your first cart",
            success:false
        });
        const {productID} = request.params;
       
        if(!productID) return response.json({
            message:'no product id is found',
            success:false
        });
        const deletingProduct = await Product.findById(productID);
        if(!deletingProduct) return response.json({
            message:"no such product found",
            success:false
        });
        const deletedProduct = await Cart.findOneAndDelete({products:deletingProduct});
        console.log(deletedProduct);
        if(!deletingProduct) return response.json({
            message:"Please add something to cart",
            success:false
        });
        return response.json({
            message:"product is deleted from cart",
            success:true
        });
    } catch (error) {
        console.error("There is an internal server error while deleting your package: ", error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});

export const fetchingUserCartProducts = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"Please login first",
            success:false
        });
        const findedCartProducts = await Cart.find({
            user:request.session.user
        });
        if(!findedCartProducts) return response.json({
            message:"Unable to fetch products",
            success:false
        });
        return response.json({
            data:findedCartProducts,
            success:true
        });
    } catch (error) {
        console.error("There is an internal server error while fetching you cart Items: ", error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});