import express from "express";
import { signUP , login } from "./user.controller.js"; 
import { checkEmail } from "../../middleware/checkEmail.js";

export const userRoutes = express.Router();
userRoutes.post('/signup', checkEmail, signUP);
userRoutes.post("/login", login);