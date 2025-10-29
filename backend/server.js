import express from "express";
import cors from "cors";
import feedbackRoutes from "./routes/feedback.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// SIMPLE CORS FIX - Allow all origins for now
app.use(cors({
  origin: "*", // Allow all origins temporarily
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Or use this even simpler approach:
// app.use(cors());

app.use(express.json());

// Routes
app.use("/api/feedback", feedbackRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "Student Feedback API is running with Supabase!",
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API status route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK",
    database: "Supabase",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for ALL origins`);
});
