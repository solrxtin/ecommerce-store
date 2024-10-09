import { Router } from "express";
import { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct } from "../controller/product.controller.js";

const router = Router();

router.post("/", createProduct)

router.patch("/:id", updateProduct)

router.delete("/:id", deleteProduct)

router.get("/", getAllProducts)

router.get("/:id", getProduct)

export default router