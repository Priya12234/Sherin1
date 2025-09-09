import express from "express";
import ProductController from "../controllers/productController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ------------------- PUBLIC ROUTES -------------------

// Get all products
router.get("/", ProductController.getProducts);

// Get product by ID
router.get("/:id", ProductController.getProductById);

// ------------------- ADMIN ROUTES -------------------

// Create a new product
router.post("/", verifyToken, admin, ProductController.createProduct);

// Update a product
router.put("/:id", verifyToken, admin, ProductController.updateProduct);

// Delete a product
router.delete("/:id", verifyToken, admin, ProductController.deleteProduct);

export default router;
