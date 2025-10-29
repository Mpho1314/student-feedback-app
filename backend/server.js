import express from "express";
import cors from "cors";
import feedbackRoutes from "./routes/feedback.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Simple CORS - allow all origins
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/feedback", feedbackRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    success: true,
    message: "Student Feedback System API",
    version: "1.0.0",
    database: "Supabase",
    endpoints: {
      feedback: "/api/feedback",
      health: "/api/health"
    }
  });
});

// API status route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "success", 
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    database: "Supabase"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
