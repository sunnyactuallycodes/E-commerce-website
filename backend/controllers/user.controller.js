import express, { request, response } from 'express';
import { asyncHandler } from '../utility/asyncHandler.js';
import bcrypt from 'bcrypt';

import { Ajayuser } from '../models/user.model.js';
import { comparePassword, hashPassword } from '../utility/hash.js';
import { Product } from '../models/products.model.js';
import { Favourites } from '../models/favourites.model.js';
import mongoose from 'mongoose';


const signupUser = asyncHandler(async(request,response)=>{
    try {
        const {name, password, phoneNumber}= request.body;
        if(!name.trim() || !password.trim() || !phoneNumber.trim()) return response.status(401).json({
            message:"Please fill all the details correctly",
            success:false
        });
        let user = await Ajayuser.findOne({phoneNumber:phoneNumber});
        const hashedPassword = hashPassword(password.trim());
        if(!hashedPassword) return response.json({
            message:"the password is not secured",
            success:false
        })
        if(!user){
            const newUser = await Ajayuser.create({
                name:name.trim(),
                password:hashedPassword,
                phoneNumber:phoneNumber
            });
            newUser.save();
            return response.json({
            message:'You are successfully logged in to Ajay Store',
            success:true
        })
        };
        return response.json({
            message:'Please try to login',
            success:false
        });
    } catch (error) {
        console.error("error while saving the user: ", error);
        return response.status(500).json({
            message:"Internal Server Error, Timeout please try again after some time",
            success:false
        })
    }
});


const loginUser = asyncHandler(async (request, response)=>{
    try {
        const {phoneNumber, password}= request.body;
        if(!phoneNumber.trim() || !password.trim()) return response.json({
            message:"please fill all the details correctly",
            success:false
        });
        const findedUser= await Ajayuser.findOne({phoneNumber:phoneNumber});
        if(!findedUser) return response.json({
            message:"Please signup first to proceed with login",
            success:false
        });
        const passwordStored= bcrypt.compareSync(password, findedUser.password);
        if(!passwordStored) return response.json({
            message:"Your password is not correct please try again",
            success:false
        });
        request.session.user = findedUser;
        return response.json({
            user: request.session.user,
            success:true,
            message:"Logged in Successfully"
        });
    } catch (error) {
        console.error("Internal server error while logging in: ", error);
        return response.json({
            message:"Please try again after some time",
            success:false
        })
    }
});


const logOutUser = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:'Please login first',
            success:false
        });
        await request.session.destroy(); // destroys the current session and reset it to the default configuration
        console.log("logged out successfully");
        return response.json({
            message:"your session is successfully logged out",
            success:true
        })
    } catch (error) {
        console.error("there is an error while logging out: ", error);
        return response.json({
            message:"Internal server error",
            success:false
        })
    }
})


const forgetPassword = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"please login first to set your new password",
            success:false
        })
        const {phoneNumber, newPassword} = request.body;
        if(!phoneNumber.trim() || !newPassword.trim()) return response.json({
            message:"Please fill the fields in the required order",
            success:true
        });
        const findedUser = await Ajayuser.findOne({phoneNumber:phoneNumber});
        console.log("everthing is fine uptil here");
        const hashedPassword = hashPassword(newPassword.trim());
        console.log(hashedPassword)
        if(!findedUser) return response.json({
            message:"Please try to correctly enter your saved mobile number",
            success:false
        });
        const updatedPassword = await Ajayuser.updateOne({phoneNumber:phoneNumber},{$set:{password:hashedPassword.trim()}});
        if(!updatedPassword) return response.json({
            message:'there might be some error while resetting your password',
            success:false
        });
        console.log(updatedPassword);
        return response.json({
            message:"your password is updated successfully",
            success:true
        })
    } catch (error) {
        console.error("there might be some internal server error while forgetting your password", error);
        return response.json({
            message:"Internal server error",
            success:false
        })
    }
});

export const checkingTheUserLogin= asyncHandler(async (request, response)=>{
    try {
        if(!request.session.user) return null;
        console.log("hello world");
        return response.json({
            user:request.session.user,
            success:true
        });
    } catch (error) {
        console.error("internal server error");
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});

export const fetchAllUsersForAdmin = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"Please login as admin to begin",
            success:false
        });
        const findingUsers = await Ajayuser.find();
        if(!findingUsers) return response.json({
            message:"no users in the database yet",
            success:false
        });
        return response.json({
            data:findingUsers,
            success:true
        });
        
    } catch (error) {
        console.error("An unexpected error occured while fetching all the users: ", error);
        return response.json({
            message:"Internal server Error",
            success:false
        })
    }
});

export const addToFavourites= asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"Please login to start",
            success:false
        });
        const {productId}= request.params; 
        console.log(productId);
        if(!productId) return response.json({
            message:"Please enter valid product id",
            success:false
        });
        const favouriteProduct = await Product.findById(productId);
        if(!favouriteProduct) return response.json({
            message:"No products are there with this id",
            success:false
        });
        console.log(favouriteProduct);
        const existingFavouriteProduct = await Favourites.findOne({
            products:favouriteProduct
        });
        if(existingFavouriteProduct) return response.json({
            message:"the product exists",
            success:false
        });
        const addingFavourite = await Favourites.create({
            user:request.session.user,
            products:favouriteProduct
        });
        if(!addingFavourite) return response.json({
            message:"No favourite products added, please try again by logging in again",
            success:false
        });

        await addingFavourite.save();
        return response.json({
            message:"Favourite product is added to the cart",
            success:true
        });

    } catch (error) {
        console.error("Encountered an error while adding the product to your favourite list");
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});

export const removeFromFavourites = asyncHandler(async(request, response)=>{
    try {
        if(!request.session.user) return response.json({
            message:"please login to proceed",
            success:false
        });
        const {productId}= request.params;
        const convertingProductId = new mongoose.Types.ObjectId(productId);
        console.log(convertingProductId);
        const favouriteToBeDeleted = await Favourites.findById(productId);
        if(!favouriteToBeDeleted) return response.json({
            message:"No such favourites founded, please add them",
            success:false
        });
        const deletingFavourite = await favouriteToBeDeleted.deleteOne();
        if(!deletingFavourite) return response.json({
            message:"Nothing is deleted, please try again",
            success:false
        });
        return response.json({
            message:"favourite product successfully deleted",
            success:true
        });
    } catch (error) {
        console.error("Encountered an error while removing the product from your favourite list");
        return response.json({
            message:"Internal Server Error",
            success:false
        });
    }
});

export {signupUser, loginUser, logOutUser, forgetPassword};


