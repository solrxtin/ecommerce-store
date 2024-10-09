import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"
dotenv.config();

import { ConnectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 3002

const __dirname = path.resolve();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://your-production-frontend-url.com'], // Allow these origins
}));

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/vite-project/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "vite-project", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server running on port ${PORT}`)
})