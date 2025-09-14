import express from "express";
// import { registerAdmin, getAdminData } from "../controllers/authController.js";
import {registerEmployer, deleteEmployer, viewApplicant, applicantDetail,changeApplicantStatus} from "../controllers/employerController.js"
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register an admin
// router.post("/register-admin", registerAdmin);
router.post('/register-employer', registerEmployer)
router.delete('/delete-employer/:id', deleteEmployer)

// Get admin data by ID
// router.get("/admin", getAdminData);

router.get('/list-applicant/:id',authenticateToken,authorizeRole("Employer"), viewApplicant)

router.get('/applicant/:id', authenticateToken,authorizeRole("Employer"),applicantDetail)

router.put('/change-applicant-status',authenticateToken,authorizeRole("Employer"),changeApplicantStatus)

export default router;
