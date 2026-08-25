import { Router } from "express";
import { fetchAllProducts, fetchOneProduct, postProducts, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get('/fetchAllProducts', fetchAllProducts);
router.get('/fetchOneProducts/:productID', fetchOneProduct);
router.post('/postProduct', upload.array("productImages", 4), postProducts);
router.post('/updatepackages/:productID', upload.array('productImages', 4), updateProduct);

export default router;