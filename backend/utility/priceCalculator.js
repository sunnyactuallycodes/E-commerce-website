import e from "express";
import { Cart } from "../models/cart.model.js";

// Helper function to calculate distance in kilometers
export function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// Main function for your shipping logic
export function isWithin40Km(lat1, lon1, lat2, lon2) {
  const distance = getDistanceInKm(lat1, lon1, lat2, lon2);
  if(distance>20 && distance<=40) return 100; 
  else if(distance>40) return 299;
  else if(distance<=20) return 0;
};

//price calculator of the total carts price available 
export const getTotalCartPrice= async(user)=>{
  try {
    if(!user) return null; 
    const getCart= await Cart.find({user:user});
    if(!getCart) return null;
    let totatPrice = 0;
    getCart.forEach((product)=>{
      totatPrice+=product.price;
    });
    console.log(totatPrice);
    return totatPrice;
    
  } catch (error) {
    console.error("there is an problem while fetching your total price from the order: ", error);

  }
};