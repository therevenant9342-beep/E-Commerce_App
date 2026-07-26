import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../../db/models/user.model.js";
import { sendConfirmationEmail } from "../../middleware/mailConfirmation.js";

const signUP = async (req, res) => {
    
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, 8);
        req.body.password = hashedPassword;

        let addedUser = await userModel.insertMany(req.body);
        addedUser[0].password = undefined;
        
        await sendConfirmationEmail(addedUser[0].email);
        res.status(201).json({
            message: "User registered successfully",
            data: addedUser[0]
        });
};

const login = async (req, res) => {
    let foundedUser = await userModel.findOne({ email: req.body.email });

    if (!foundedUser) {
        return res.status(404).json({
            message: "User not found please check your email or signup"
        });
    }
    if (foundedUser.isconfirmed === false) {
        return res.status(403).json({
            message: "Please confirm your email before logging in."
        });
    }

    let matchedPassword = bcrypt.compareSync(req.body.password, foundedUser.password);
    if (matchedPassword) {
        let token = jwt.sign({ id: foundedUser.id, role: foundedUser.role }, process.env.SECRET_KEY);
        return res.status(200).json({
            message: "Loged in successfully", token
        });
    } else {
        return res.status(401).json({
            message: "Email or password is incorrect"
        });
    }
}

const verifyAccount = async (req, res) => {
    const token = req.params.token;
    try {
        const decoded = jwt.verify(token, "emailConfirmationSecret");
        
        await userModel.findOneAndUpdate({ email: decoded.email }, { isconfirmed: true });
        res.status(200).json({
            message: "Email confirmed successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid or expired token"
        });
    }
}

export { signUP, login, verifyAccount };