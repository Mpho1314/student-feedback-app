import { useState } from "react";
import axios from "axios";
import './FeedbackForm.css';

export default function FeedbackForm({ onFeedbackAdded }) {
  const [form, setForm] = useState({ 
    studentName: "", 
    courseCode: "", 
    courseName: "",
    comments: "", 
    rating: 5 
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      await axios.post("http://localhost:5000/api/feedback", form);
      onFeedbackAdded();
      setForm({ studentName: "", courseCode: "", courseName: "", comments: "", rating: 5 });
    } catch (err) {
      setError(err.response?.data?.error || "Error submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Submit Your Feedback</h2>
        <p className="form-subtitle">Help us improve the learning experience</p>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input 
              id="studentName"
              name="studentName" 
              placeholder="Enter your full name" 
              value={form.studentName} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseCode">Course Code</label>
            <input 
              id="courseCode"
              name="courseCode" 
              placeholder="e.g., CS101, MATH202" 
              value={form.courseCode} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input 
              id="courseName"
              name="courseName" 
              placeholder="e.g., Introduction to Computer Science, Calculus I" 
              value={form.courseName} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Your Feedback</label>
            <textarea 
              id="comments"
              name="comments" 
              placeholder="Share your thoughts about the course, teaching style, materials, etc. (Minimum 5 characters)"
              value={form.comments} 
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
            <div className="char-count">{form.comments.length}/500</div>
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <div className="rating-container">
              <select name="rating" value={form.rating} onChange={handleChange} className="rating-select">
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>
                    {n} Star{n !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <div className="rating-display">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < form.rating ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}