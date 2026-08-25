import { Router } from "express";
import { addProdcutsToCart, deleteProductFromCart, fetchingUserCartProducts } from "../controllers/cart.controller.js";


const router = Router();

router.post('/post/cart/:productID', addProdcutsToCart);
router.get('/delete/cart/:productID', deleteProductFromCart);
router.get('/get/cart/products', fetchingUserCartProducts);


export default router;