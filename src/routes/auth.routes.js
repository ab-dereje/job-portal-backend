import express from "express";
import { registerAdmin, getAdminData } from "../controllers/authController.js";

const router = express.Router();

// Register an admin
router.post("/register-admin", registerAdmin);

// Get admin data by ID
router.get("/admin", getAdminData);

export default router;
