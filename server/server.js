import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "../server/router/user/authRouter.js"; 
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import AdminProductRouter from "../server/router/admin/productRouter.js"
import { notFound } from "./middleware/notFound.js";
import OrderRouter from "./router/admin/orderRouter.js"
import CartRouter from "./router/shop/cartRouter.js"
import AddressRouter from "./router/shop/addressRouter.js"
import ShopProdcutRouter from "./router/shop/productRouter.js"
import SearchRouter from "./router/shop/searchRouter.js"
import ReviewRouter from "./router/shop/reviewRouter.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",  
        "Expires",
        "Pragma",
    ],
    credentials: true,
}));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));
app.use("/api/test", (req, res) => {
    try {
        res.send("Hello World");
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.use("/api/auth", AuthRouter);
app.use("/api/admin/product", AdminProductRouter);
app.use("/api/admin/order", OrderRouter);
app.use("/api/shop/cart", CartRouter);
app.use("/api/shop/address", AddressRouter);
app.use("/api/shop/products", ShopProdcutRouter)
app.use("api/shop/search", SearchRouter)
app.use("/api/shop/review", ReviewRouter)
app.use(notFound)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DATABASE");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    } catch (err) {
        console.error("Error while connecting to DATABASE", err);
    }
};

startServer();
