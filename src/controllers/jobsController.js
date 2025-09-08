import prisma from "../../prisma/prisma.js";

export const createJob = async (req,res)=>{
    try {
        const { title, description } = req.body;
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
            
          },
        });
    
        res.status(201).json({ message: "Job created successfully", job });
      } catch (error) {
        res.status(500).json({ message: "Error creating job", error: error.message });
      }
}

export const getJobs =async (req,res)=>{
    const userId = req.user.id;
    const jobs = await prisma.job.findMany();
    res.status(201).json({ message: "Job created successfully", jobs })
}