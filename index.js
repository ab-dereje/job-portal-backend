// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import authRoutes from "./src/routes/auth.routes.js"
import authRoutes from "./src/routes/auth.routes.js";
import employeRoutes from "./src/routes/employer.routes.js";
import applicantRoutes from "./src/routes/applicant.routes.js";
import jobRoutes from "./src/routes/job.routes.js";


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/employer", employeRoutes)
app.use('/applicant', applicantRoutes)
app.use('/job', jobRoutes);

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
