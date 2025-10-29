import express from "express";
import cors from "cors";
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('Please check your .env file has SUPABASE_URL and SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Supabase client initialized');

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Student Feedback API is running with Supabase!" });
});

// GET all feedback
app.get("/api/feedback", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// POST new feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { studentName, courseCode, comments, rating } = req.body;

    if (!studentName || !courseCode || !comments || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          student_name: studentName,
          course_code: courseCode,
          comments: comments,
          rating: rating
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ 
      message: 'Feedback submitted successfully',
      id: data[0].id 
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
});

// DELETE feedback
app.delete("/api/feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('feedback')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Using Supabase: ${supabaseUrl}`);
});
