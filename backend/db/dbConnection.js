import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/ecommerce_db')
        .then(() => console.log('Database connected successfully'))
        .catch((err) => console.log('Error connecting to database:', err));
};