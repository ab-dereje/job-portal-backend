// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import authRoutes from "./src/routes/auth.routes.js"
import authRoutes from "./src/routes/auth.routes.js";
import employeRoutes from "./src/routes/employer.routes.js";
import applicantRoutes from "./src/routes/applicant.routes.js";
import jobRoutes from "./src/routes/job.routes.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load environment variables
dotenv.config();

const corsOption = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  credentials: true // Allow cookies to be sent with requests
};
const app = express();

// Middleware
// app.use(cors());
app.use(cors(corsOption));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/employer", employeRoutes)
app.use('/applicant', applicantRoutes)
app.use('/job', jobRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
