import express from "express";
import { registerAdmin, getAdminData, login } from "../controllers/authController.js";
import {registerEmployer} from "../controllers/employerController.js";
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register an admin
router.post("/register-admin", registerAdmin);
router.post('/register-employer', registerEmployer)

// Get admin data by ID
router.get("/admin",authenticateToken,authorizeRole("Admin"), getAdminData);


//for the login purpose
router.post("/login", login);


export default router;
