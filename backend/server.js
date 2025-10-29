import express from "express";
import cors from "cors";
import feedbackRoutes from "./routes/feedback.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://student-feedback-app.vercel.app',
      'https://student-feedback-app-git-main-mpho1314.vercel.app',
      'https://student-feedback-app-mpho1314.vercel.app'
      // Add your actual Vercel domains here
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

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

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    path: req.originalUrl 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'CORS policy violation',
      message: 'Origin not allowed' 
    });
  }
  
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for frontend domains`);
});
