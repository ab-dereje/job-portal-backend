import express from "express";
// import { registerAdmin, getAdminData } from "../controllers/authController.js";
import {registerApplicant, deleteApplicant, applyForJob, listAppliedJob} from "../controllers/applicantController.js"
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";
import { uploadResume } from "../middlewares/uploadMiddleware.js";


const router = express.Router();

// Register an admin
// router.post("/register-admin", registerAdmin);
router.post('/register-applicant', registerApplicant);
router.delete('/delete-applicant/:id',authenticateToken,authorizeRole("Admin"), deleteApplicant);

// Get admin data by ID
// router.get("/admin", getAdminData);

//apply for a job
router.post("/apply/:jobId", authenticateToken, uploadResume, applyForJob);
router.get("/list-applied-jobs",authenticateToken,listAppliedJob)

export default router;