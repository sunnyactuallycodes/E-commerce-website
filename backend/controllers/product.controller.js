import { Product } from "../models/products.model.js";
import e, { request, response } from "express";
import { asyncHandler } from "../utility/asyncHandler.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";
import mongoose, { set } from "mongoose";

export const fetchAllProducts = asyncHandler(async(request, response)=>{
    try {
        const findedPackages = await Product.find();
        if(findedPackages?.length<=0) return response.json({
            message:"No packages found",
            success:false
        });
        return response.json({
            data:findedPackages,
            success:true
        });

    } catch (error) {
        console.error("there is an internal server error while fetching all the packages: ", error);
        return response.json({
            message:'Internal server error, try again later',
            success:false
        })
    }
});

export const fetchOneProduct = asyncHandler(async(request, response)=>{
    try {
        const {productID} = request.params;
        if(!productID) return response.json({
            message:"no such package id is there",
            success:false
        });
        const findedProducts= await Product.findById(productID);
        console.log(findedProducts);
        if(!findedProducts) return response.json({
            message:'the product is not found',
            success:false
        });
        return response.json({
            data:findedProducts,
            success:true
        });
        
    } catch (error) {
        console.error("There is an internal server error while fetching one product: ", error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});


// admin specific route controllers
export const postProducts= asyncHandler(async(request, response)=>{
    try {
        const {productName,brandName,productDescription,Price,category,productDetails,productSize}= request.body;
        console.log(productDescription, productName, brandName, Price, category, productSize,productDetails);
        
        if(!productName.trim() || !brandName.trim() || !productDescription.trim() || !Price.trim() || !category.trim() || !productDetails?.length>0 || !productSize?.length>0) return response.json({
            message:"please fill all the fields correctly",
            success:false
        });
        const files = request.files;                    // from multer
        console.log(files);
        
         const productImages = request.files || [];

        if (productImages.length !== 4) {
            return response.status(400).json({
                message: "Please upload exactly 4 images",
                success: false
            });
        }

        const uploadedUrls = await Promise.all(
            productImages.map(file => uploadOnCloudinary(file.buffer))
        );
       const securedUrls = uploadedUrls.map((uploaded)=>{
            return uploaded.secure_url
       });
     

        const newproduct = await Product.create({
            productName:productName, productDescription:productDescription, Price:Price,quantity:1,category:category,productDetails:productDetails, productImages:securedUrls, productSize:productSize, favourites:false, brandName:brandName,
        });
        newproduct.save();
        return response.json({
            message:"Your product is saved successfully",
            success:true
        });
        
    } catch (error) {
        console.error("Internal Server Error while posting the product: ", error);
        return response.json({
            message:"internal server error",
            success:false
        })
    }
});


//admin specific route controllers 
export const deleteProduct = asyncHandler(async(request, response)=>{
    try {
       const {productID} = request.params;
       if(!productID) return response.json({
        message:"no such product id is there in the server",
        success:false
       });
       const deletedProduct = await Product.findByIdAndDelete(productID);
       console.log(deletedProduct);
       if(!deletedProduct) return response.json({
        message:"no product is deleted",
        success:false
       });
       return response.json({
        message:"Your package is successfully deleted",
        success:true
       });

       
    } catch (error) {
        console.error("There might an internal server error while connecting to the server: ", error);
        return response.json({
            message:"Internal server error",
            success:false
        })
    }
});

//admin route controller
export const updateProduct = asyncHandler(async(request,response)=>{
    try {
        const {productID} = request.params;
        const {productName,brandName,productDescription,Price,category,productDetails,productSize}= request.body;
        console.log(productID);

        if(!productID) return response.json({
            message:"no such product id is found",
            success:false
        });
        const files = request.files;                    // from multer
        const productImages = Array.isArray(files) ? files : files?.productImages || [];
         const uploadedUrls = await Promise.all(
            productImages.map(file => uploadOnCloudinary(file.buffer))
        );
       const securedUrls = uploadedUrls.map((uploaded)=>{
            return uploaded.secure_url
       });
        
        const updatingProducts = await Product.findById(productID);
        const newProduct = await updatingProducts.updateOne({$set:{
            productDescription,
            brandName,
            Price,
            category,
            productDetails,
            productImages:securedUrls,
            productSize,
            productName
        }})
        console.log(newProduct);
        if(!updatingProducts) return response.json({
            message:'no updated packages',
            success:false
        });
        return response.json({
            message:"your package is successfully updated",
            success:false
        });

    } catch (error) {
        console.error("there is an internal server error while updating your product: ",error);
        return response.json({
            message:"Internal Server Error",
            success:false
        })
    }
});

