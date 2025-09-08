import express from "express";
// import { registerAdmin, getAdminData } from "../controllers/authController.js";
import {registerApplicant, deleteApplicant} from "../controllers/applicantController.js"
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Register an admin
// router.post("/register-admin", registerAdmin);
router.post('/register-applicant', registerApplicant);
router.delete('/delete-applicant/:id',authenticateToken,authorizeRole("Admin"), deleteApplicant);

// Get admin data by ID
// router.get("/admin", getAdminData);

export default router;