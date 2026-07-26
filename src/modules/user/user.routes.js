import express from "express";
import { signUP } from "./user.controller.js"; 

export const userRoutes = express.Router();
userRoutes.post('/signup', signUP);