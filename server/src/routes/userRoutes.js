import express from "express";
import UserController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ---------------- PUBLIC ROUTES ----------------

// Register a new user
router.post("/register", UserController.registerUser);

// Login user
router.post("/login", UserController.loginUser);

// ---------------- verifyTokenED USER ROUTES ----------------

// Get user profile
router.get("/profile", verifyToken, UserController.getUserProfile);

// Update user profile
router.put("/profile", verifyToken, UserController.updateUserProfile);

// ---------------- ADMIN ROUTES ----------------

// Get all users
router.get("/", verifyToken, admin, UserController.getUsers);

// Get single user by ID
router.get("/:id", verifyToken, admin, UserController.getUserById);

// Update user by ID
router.put("/:id", verifyToken, admin, UserController.updateUserProfileById);

// Delete user by ID
router.delete("/:id", verifyToken, admin, UserController.deleteUserById);

export default router;
