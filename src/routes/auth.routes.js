import express from "express";
import { registerAdmin, getAdminData } from "../controllers/authController.js";
import {registerEmployer} from "../controllers/employerController.js"

const router = express.Router();

// Register an admin
router.post("/register-admin", registerAdmin);
router.post('/register-employer', registerEmployer)

// Get admin data by ID
router.get("/admin", getAdminData);

export default router;
