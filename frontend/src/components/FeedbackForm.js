import { useState } from "react";
import axios from "axios";
import './FeedbackForm.css';

// ✅ UPDATE THIS LINE - Use your new Render backend URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://student-feedback-app-e9ce.onrender.com/api' 
  : 'http://localhost:5000/api';

export default function FeedbackForm({ onFeedbackAdded }) {
  // ... rest of your FeedbackForm.js code

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentName.trim() || !form.courseCode.trim() || !form.courseName.trim() || !form.comments.trim()) {
      return setError("All fields are required!");
    }
    if (form.comments.length < 10) {
      return setError("Comments must be at least 10 characters long.");
    }

    setSubmitting(true);
    setError("");

    try {
      await axios.post(`${API_BASE_URL}/feedback`, form);
      onFeedbackAdded();
      setForm({ studentName: "", courseCode: "", courseName: "", comments: "", rating: 5 });
    } catch (err) {
      setError(err.response?.data?.error || "Error submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  // ... rest of your FeedbackForm.js code
