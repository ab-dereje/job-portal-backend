import prisma from "../../prisma/prisma.js";
import bcrypt from "bcrypt";

export const registerEmployer = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // create admin user
      const employer = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "Employer",
        },
      });
  
      res.status(201).json({ message: "Employer registered successfully", employer });
    } catch (error) {
      res.status(500).json({ message: "Error registering employer", error: error.message });
    }
  };

  export const deleteEmployer = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
  
      // check if user already exists
      const existingUser = await prisma.user.delete({ where: { id } });
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
  
      res.status(201).json({ message: "Employer deleted successfully", employer });
    } catch (error) {
      res.status(500).json({ message: "Error registering employer", error: error.message });
    }
  };


  export const viewApplicant = async (req,res)=>{
    try{
      
      const { id } = req.params;
      const userId = req.user.id;

      

      const applicantList = await prisma.application.findMany({
        where:{
          jobId:id,
          userId:userId
        }})

      if(!applicantList){
        res.status(404).json({ message: "there is no applicant"})
      }

      res.status(201).json({ message: "applicant list", applicantList})
    }catch (error){
      res.status(500).json({ message: "Error fetching list of applicant", error: error.message });
    }
  }

  export const applicantDetail = async (req, res) => {
    try {
      console.log("adej")
      const { id } = req.params;
  
      const applicantDetail = await prisma.application.findUnique({
        where: {
          id: id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          job: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      });
  
      if (!applicantDetail) {
        return res.status(404).json({ message: "Applicant detail not found" });
      }
  
      res.status(200).json(applicantDetail);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching applicant detail", error: error.message });
    }
  };
  