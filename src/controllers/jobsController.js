import prisma from "../../prisma/prisma.js";

export const createJob = async (req,res)=>{
    try {
        const { title, description, salary } = req.body;
        const userId = req.user.id; // from JWT middleware
    
        // ensure the logged-in user exists
        const employer = await prisma.user.findUnique({ where: { id: userId } });
        if (!employer) {
          return res.status(404).json({ message: "Employer not found" });
        }
    
        // only Employers or Admins can create jobs
        if (employer.role !== "Employer" && employer.role !== "Admin") {
          return res.status(403).json({ message: "Unauthorized to create job" });
        }
    
        // create job
        const job = await prisma.job.create({
          data: {
            title,
            description,
            createdBy: userId, // relation field
            salary,
          },
        });
    
        res.status(201).json({ message: "Job created successfully", job });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating job", error: error.message });
      }
}

//the following function is used to get all jobs for the applicants
export const getJobs =async (req,res)=>{
    // const userId = req.user.id;
    const jobs = await prisma.job.findMany({ where: { status: "opened" } }  );
    if(!jobs){
        return res.status(404).json({ message: "No jobs found" });
    }
    res.status(201).json({ message: "Job fetched successfully", jobs })
}

//the following function is used to get all jobs for the employers
export const getJobsForEmployer = async (req,res)=>{
    const userId = req.user.id;
    const jobs = await prisma.job.findMany({ where: { createdBy: userId } });
    if(!jobs){
        return res.status(404).json({ message: "No jobs found" });
    }
    res.status(201).json({ message: "Job fetched successfully", jobs })
}

//the following function is used to get a single job for the employers
export const getJobById = async (req,res)=>{
    const jobId = req.params.id;

    const id = parseInt(jobId, 10);

    const job = await prisma.job.findUnique({ where: { id: id } });
    if(!job){
        return res.status(404).json({ message: "Job not found" });
    }
    res.status(201).json({ message: "Job fetched successfully", job })
}

//the following function is used to update a job for the employers
export const updateJob = async (req,res)=>{
    try {
        const userId = req.user.id;
        const jobId = req.params.id;

        const id = parseInt(jobId, 10);

        const { title, description, salary } = req.body;
        const job = await prisma.job.update({ where: { id: id, createdBy: userId }, data: { title, description, salary } });
        if(!job){
        return res.status(404).json({ message: "Job not found" });
        }
        res.status(201).json({ message: "Job updated successfully", job })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating job", error: error.message });
    }
}

//the following function is used to delete a job for the employers
export const deleteJob = async (req,res)=>{
    try {
        const userId = req.user.id;
        const jobId = req.params.id;

        const id = parseInt(jobId, 10);

        const job = await prisma.job.delete({ where: { id: id, createdBy: userId } });
        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(201).json({ message: "Job deleted successfully", job })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting job", error: error.message });
    }
}

//the following function is used to change the status of a job for the employers
export const changeJobStatus = async (req,res)=>{
    try { 
        const jobId = req.params.id;
        const { status } = req.body;
        const id = parseInt(jobId, 10);
        const job = await prisma.job.update({ where: { id: id }, data: { status } });
        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(201).json({ message: "Job status updated successfully", job })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating job status", error: error.message });
    }
}


//get job details for the applicants
export const getJobDetails = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const id = parseInt(jobId, 10);
        const job = await prisma.job.findUnique({ where: { id: id, status: "opened" } });

        

        if(!job){
        return res.status(404).json({ message: "Job not found" });
    }
    res.status(201).json({ message: "Job details fetched successfully", job })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching job details", error: error.message });
    }
}