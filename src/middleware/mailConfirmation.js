import nodemailer from "nodemailer";
import { createEmailTemplate } from "../utilities/emailTemplate.js";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendConfirmationEmail = async (email) => {
    const htmlTemplate = createEmailTemplate(email);
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Confirmation",
        html: htmlTemplate
    });
};