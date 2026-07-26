import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import { userRoutes } from "./src/modules/user/user.routes.js";
const app = express();
app.use(express.json());

dbConnection();
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
