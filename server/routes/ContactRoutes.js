import { Router } from "express";
import { searchContact,getContactsForDmList } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js" 

const contactRoutes = Router();


contactRoutes.post("/search", verifyToken, searchContact);
contactRoutes.get("/getcontactsfordm", verifyToken, getContactsForDmList);








export default contactRoutes;