import { userModel } from "../../db/models/user.model.js";

export const checkEmail = async (req, res, next) => {
    let exists = await userModel.findOne({ email: req.body.email });
    if (exists) {
        return res.status(409).json({
            message: "User already exists please login"
        });
    }
    next();
};