// src/routes/job.routes.js
import express from "express";
import { createJob, getJobs } from "../controllers/jobsController.js";
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Employer or Admin can create jobs
router.post(
  "/create-job",
  authenticateToken,
  authorizeRole("Employer", "Admin"),
  createJob
);

router.get('/all-jobs',authenticateToken,getJobs)
export default router;
