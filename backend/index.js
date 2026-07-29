import "dotenv/config";
import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import { userRoutes } from "./src/modules/user/user.routes.js";
import { productRoutes } from "./src/modules/products/product.routes.js";
import { cartRoutes } from "./src/modules/cart/cart.routes.js";
import { orderRoutes } from "./src/modules/order/order.routes.js";

const app = express();
app.use(express.json());

dbConnection();
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});