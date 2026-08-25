import { Router } from "express";
import { addToFavourites, checkingTheUserLogin, fetchAllUsersForAdmin, forgetPassword, loginUser, logOutUser, removeFromFavourites, signupUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/signup', signupUser);
router.post('/login',loginUser);
router.get('/logout', logOutUser);
router.post('/forgetPassword', forgetPassword);
router.get('/user/login', checkingTheUserLogin);
router.get('/users/fetchAllUsers/admin', fetchAllUsersForAdmin);
router.get('/favourite/:productId', addToFavourites);
router.get('/favourites/remove/:productId', removeFromFavourites);

export default router;