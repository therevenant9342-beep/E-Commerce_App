import jwt from "jsonwebtoken";

export const createEmailTemplate = (email) => {
    const token = jwt.sign({ email }, "emailConfirmationSecret", { expiresIn: "1h" });
    const htmlTemplate = `
    <html>
        <body>
            <h1>Email Confirmation</h1>
            <p>Thank you for signing up! Please confirm your email by clicking the link below:</p>
            <a href="http://localhost:3000/users/verify/${token}">Confirm Email</a>
        </body>
    </html>
    `;
    return htmlTemplate;
};