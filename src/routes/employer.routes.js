import express from "express";
// import { registerAdmin, getAdminData } from "../controllers/authController.js";
import {registerEmployer, deleteEmployer} from "../controllers/employerController.js"

const router = express.Router();

// Register an admin
// router.post("/register-admin", registerAdmin);
router.post('/register-employer', registerEmployer)
router.delete('/delete-employer/:id', deleteEmployer)

// Get admin data by ID
// router.get("/admin", getAdminData);

export default router;
