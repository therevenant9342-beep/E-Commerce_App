import express from "express";
import { dbConnection } from "./db/dbConnection.js";

const app = express();

dbConnection();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
