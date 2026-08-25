import { Router } from "express";
import google from '../strategy/strategy.js'
import { addProdcutsToCartForGoogleUser } from "../controllers/cart.controller.js";

const router = Router();

router.get('/auth/google',google.authenticate('google'));
router.get('/auth/google/callback',google.authenticate('google',{failureRedirect:"http://localhost:5173", failureMessage:true}),(request, response,next)=>{
    response.redirect('http://localhost:5173/shop');
    next();
});
router.post('/google/post/cart/:productID', addProdcutsToCartForGoogleUser);

export default router;