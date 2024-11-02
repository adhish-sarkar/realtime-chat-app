import { Router } from "express";
import { signUp, signIn, getuserInfo, updateProfile } from '../controllers/AuthController.js';
import { verifyToken } from "../middlewares/AuthMiddleware.js";


const authRoutes = Router();

authRoutes.post('/signup', signUp);
authRoutes.post('/signin', signIn);
authRoutes.get('/user-info',verifyToken, getuserInfo);
authRoutes.post('/update-profile',verifyToken, updateProfile);

export default authRoutes;