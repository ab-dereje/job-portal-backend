import prisma from "../../prisma/prisma.js";
import bcrypt from "bcrypt";
import path from "path";
export const registerApplicant = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // create applicant user
      const applicant = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "Applicant",
        },
      });
  
      res.status(201).json({ message: "applicant registered successfully", applicant });
    } catch (error) {
      res.status(500).json({ message: "Error registering applicant", error: error.message });
    }
  };

  export const deleteApplicant = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
  
      const deleteid = parseInt(applicantId, 10);
      // check if user already exists
      const existingUser = await prisma.user.delete({ where: { id:deleteid } });
      if (!existingUser) {
        return res.status(400).json({ message: "User not deleted" });
      }

  
    //   // create admin user
    //   const employer = await prisma.user.create({
    //     data: {
    //       name,
    //       email,
    //       password: hashedPassword,
    //       role: "Employer",
    //     },
    //   });
  
      res.status(201).json({ message: "applicant deleted successfully", employer });
    } catch (error) {
      res.status(500).json({ message: "Error registering applicant", error: error.message });
    }
  };

  //the following function is used to apply for a job
  // export const applyForJob = async (req,res)=>{
  //   try {
  //       const { jobId } = req.params;
  //       const { userId } = req.user;
  //       // const { resume } = req.body;

  //       //the resume is a file, so we need to upload the file directory to the database and then store file in the folder of the applicant
  //       const resumePath = await uploadFile(resume);

  //       const job = await prisma.job.findUnique({ where: { id: jobId } });
  //       if(!job){
  //           return res.status(404).json({ message: "Job not found" });
  //       }
  //       const application = await prisma.application.create({
  //           data: {
  //               jobId,
  //               userId,
  //               resume,
  //           }
  //       })
  //       res.status(201).json({ message: "Application submitted successfully", application })
  //   } catch (error) {
  //       console.log(error);
  //       res.status(500).json({ message: "Error submitting application", error: error.message });
  //   }
  // }


  // export const applyForJob = async (req, res) => {
  //   try {
  //     const { jobId } = req.params;
  //     const { userId } = req.user;
  
  //     // File path will be stored in DB
  //     const resumePath = req.file ? req.file.path : null;
  //     console.log(resumePath)
  //     if (!resumePath) {
  //       return res.status(400).json({ message: "Resume file is required" });
  //     }
  
  //     const job = await prisma.job.findUnique({ where: { id: jobId } });
  //     if (!job) {
  //       return res.status(404).json({ message: "Job not found" });
  //     }
  
  //     const application = await prisma.application.create({
  //       data: {
  //         jobId,
  //         userId,
  //         resume: resumePath, // store directory in DB
  //       },
  //     });
  
  //     res
  //       .status(201)
  //       .json({ message: "Application submitted successfully", application });
  //   } catch (error) {
  //     console.log(error);
  //     res
  //       .status(500)
  //       .json({ message: "Error submitting application", error: error.message });
  //   }
  // };
  

  export const applyForJob = async (req, res) => {
    try {
      const { jobId } = req.params;
      const userId  = req.user.id; // make sure this is set from auth middleware

      
      // console.log(userId)
      if (!userId) {
        return res.status(400).json({ message: "User not authenticated" });
      }

      const job_Id = parseInt(jobId, 10);
      
      const job = await prisma.job.findUnique({ where: { id: job_Id } });
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      const checkIfApplied = await prisma.application.findFirst({ where: {jobId:job_Id, userId } });
      if (checkIfApplied) {
        return res.status(400).json({ message: "You have already applied for this job" });
      }

      const relativePath = path.relative(
        path.resolve("uploads"), // base folder
        req.file.path
      );
      // console.log(relativePath)
  
      const application = await prisma.application.create({
        data: {
          // resume: req.file.path,
          resume: `uploads/${relativePath}`, // multer stores the file path
          job: {
            connect: { id: job_Id },
          },
          user: {
            connect: { id: userId },
          },
        },
      });
  
      res
        .status(201)
        .json({ message: "Application submitted successfully", application });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error submitting application", error: error.message });
    }
  };
  

  export const listAppliedJob = async (req, res) => {
    try {
      // const { jobId } = req.params;
      const userId  = req.user.id; 
      // console.log(userId)
      if (!userId) {
        return res.status(400).json({ message: "User not authenticated" });
      }
      
      console.log(userId)

      const AppliedList = await prisma.application.findMany({ where: { userId: userId } });
      console.log('applied list are',AppliedList)
      
      if (!AppliedList) {
        return res.status(404).json({ message: "there is no applied job" });
      }

      res.status(201).json({message:"applieded list are",AppliedList});
      
      // return res.status(201).json({ message: "list of applied job" },AppliedList);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error submitting application", error: error.message });
    }
  };