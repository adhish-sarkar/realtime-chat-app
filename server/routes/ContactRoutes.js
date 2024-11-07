import { Router } from "express";
import { searchContact,getContactsForDmList, getAllContacts } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js" 

const contactRoutes = Router();


contactRoutes.post("/search", verifyToken, searchContact);
contactRoutes.get("/getcontactsfordm", verifyToken, getContactsForDmList);
contactRoutes.get("/get-allcontacts", verifyToken, getAllContacts);








export default contactRoutes;