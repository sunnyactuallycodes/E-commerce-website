import { Router } from "express";
import { createOrderForPayment, verifyPayment } from "../controllers/payment.controller.js";


const router= Router();

router.post('/createOrder/rzpgateway', createOrderForPayment);
router.post('/verifyPayment/rzpgateway', verifyPayment);


export default router;