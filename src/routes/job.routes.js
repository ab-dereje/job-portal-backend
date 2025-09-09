// src/routes/job.routes.js
import express from "express";
import { createJob, getJobs, getJobsForEmployer, getJobById, updateJob, deleteJob, changeJobStatus } from "../controllers/jobsController.js";
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Employer or Admin can create jobs
router.post(
  "/create-job",
  authenticateToken,
  authorizeRole("Employer"),
  createJob
);

//get all jobs for the applicants
router.get('/all-jobs',authenticateToken,getJobs)

//get all jobs for the employers
router.get('/all-jobs-for-employer',authenticateToken,getJobsForEmployer)

//get a single job for the employers
router.get('/:id',authenticateToken,getJobById)

//update a job for the employers
router.put('/:id',authenticateToken,updateJob)  

//delete a job for the employers
router.delete('/:id',authenticateToken,deleteJob)

//change the status of a job for the employers
router.put('/:id/status',authenticateToken,changeJobStatus)
export default router;
