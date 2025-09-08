import prisma from "../../prisma/prisma.js";
import bcrypt from "bcrypt";

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
  
      res.status(201).json({ message: "applicant deleted successfully", employer });
    } catch (error) {
      res.status(500).json({ message: "Error registering applicant", error: error.message });
    }
  };