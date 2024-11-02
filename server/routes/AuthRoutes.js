import { Router } from "express";
import { signUp, signIn, getuserInfo } from '../controllers/AuthController.js';
import { verifyToken } from "../middlewares/AuthMiddleware.js";


const authRoutes = Router();

authRoutes.post('/signup', signUp);
authRoutes.post('/signin', signIn);
authRoutes.get('/user-info',verifyToken, getuserInfo);

export default authRoutes;