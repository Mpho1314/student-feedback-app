import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Dashboard from './components/Dashboard';
import './App.css';

// ✅ UPDATE THIS LINE - Use your new Render backend URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://student-feedback-app-e9ce.onrender.com/api' 
  : 'http://localhost:5000/api';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      console.log('Fetching from:', `${API_BASE_URL}/feedback`);
      const response = await fetch(`${API_BASE_URL}/feedback`);
      if (!response.ok) throw new Error('Failed to fetch feedbacks');
      
      const data = await response.json();
      const formattedData = data.map(item => ({
        id: item.id,
        studentName: item.student_name,
        courseCode: item.course_code,
        courseName: item.course_name,
        comments: item.comments,
        rating: item.rating,
        createdAt: item.created_at
      }));
      setFeedbacks(formattedData);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      showNotification('Failed to fetch feedbacks', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleFeedbackAdded = () => {
    showNotification('Feedback submitted successfully!');
    fetchFeedbacks();
    setCurrentView('dashboard');
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          showNotification('Feedback deleted successfully!');
          fetchFeedbacks();
        } else {
          throw new Error('Failed to delete feedback');
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
        showNotification('Failed to delete feedback', 'error');
      }
    }
  };

  // ... rest of your App.js code remains the same
