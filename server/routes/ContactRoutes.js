import { Router } from "express";
import { searchContact } from "../controllers/ContactController.js";

const contactRoutes = Router();


contactRoutes.post("/search", searchContact)








export default contactRoutes;