// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import authRoutes from "./src/routes/auth.routes.js"
import authRoutes from "./src/routes/auth.routes.js";
import employeRoutes from "./src/routes/employer.routes.js"


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/employer", employeRoutes)

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
