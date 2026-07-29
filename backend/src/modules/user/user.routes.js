import express from "express";
import { signUP , login } from "./user.controller.js"; 
import { checkEmail } from "../../middleware/checkEmail.js";
import { verifyAccount } from "./user.controller.js";

export const userRoutes = express.Router();
userRoutes.post('/signup', checkEmail, signUP);
userRoutes.post("/login", login);
userRoutes.get('/verify/:token', verifyAccount);