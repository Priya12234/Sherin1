// routes/cartRoutes.js
import express from "express";
import cartController from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ---------------- CUSTOMER ROUTES ----------------
router.get("/", verifyToken, cartController.getUserCart);
router.post("/add", verifyToken, cartController.addToCart);
router.delete("/remove/:productId", verifyToken, cartController.removeFromCart);
router.delete("/clear", verifyToken, cartController.clearCart);

// ---------------- ADMIN ROUTES ----------------
router.get("/admin", verifyToken, admin, cartController.getAllCarts);
router.get("/admin/:userId", verifyToken, admin, cartController.getCartByUserId);

export default router;
