import express from "express";
import comboController from "../controllers/comboController.js";

const router = express.Router();

// ================= Admin Routes =================
router.post("/admin/create", comboController.createNewCombo);
router.put("/admin/update/:id", comboController.updateCombo);
router.delete("/admin/delete/:id", comboController.deleteCombo);
router.get("/admin/all", comboController.getAllCombosAdmin);

// ================= Customer Routes =================
router.get("/", comboController.getAllCombosCustomer);
router.get("/:id", comboController.getSingleComboCustomer);

export default router;
