import { Router } from "express";
import { createOrder, fetchAllOrders, fetchingOrders, onlyShippingCharges, payingViaCashOnDelivery, updateDateForDelivery } from "../controllers/order.controller.js";

const router = Router();


router.post('/cart/processingOrder/:lat/:lng', createOrder);
router.get('/shippingCharges/:lat/:lng', onlyShippingCharges);
router.post('/payment/cashOnDelivery/:lat/:lng', payingViaCashOnDelivery);
router.get('/cart/getAllOrders', fetchingOrders);
router.get("/cart/fetchOrders/admin", fetchAllOrders);
router.post("/cart/update/date/admin/:orderId", updateDateForDelivery);

export default router;