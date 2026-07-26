import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../../db/models/user.model.js";

export const signUP = async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, 8);
        req.body.password = hashedPassword;

        let addedUser = await userModel.insertMany(req.body);
        addedUser[0].password = undefined;
        res.status(201).json({
            message: "User registered successfully",
            data: addedUser[0]
        });
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};