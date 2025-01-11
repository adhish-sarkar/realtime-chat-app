import { Router } from "express";
import {
    signUp,
    signIn,
    getuserInfo,
    updateProfile,
    addProfileImage,
    removeProfileImage,
    logout
} from '../controllers/AuthController.js';
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from 'multer';


const upload = multer({
    dest: 'uploads/profiles',
});

const authRoutes = Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up to the Server
 *     description: Create an account to the portal.
 *     responses:
 *       201:
 *         description: Successfully Create an account.
 */
authRoutes.post('/signup', signUp);
authRoutes.post('/signin', signIn);
authRoutes.get('/user-info', verifyToken, getuserInfo);
authRoutes.post('/update-profile', verifyToken, updateProfile);
authRoutes.post('/add-profile-image', verifyToken, upload.single("profile-image"), addProfileImage);
authRoutes.delete('/remove-profile-image', verifyToken, removeProfileImage);
authRoutes.post('/logout', logout);

export default authRoutes;