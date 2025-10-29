import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Dashboard from './components/Dashboard';
import './App.css';

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
      const response = await fetch('http://localhost:5000/api/feedback');
      if (!response.ok) throw new Error('Failed to fetch feedbacks');
      
      const data = await response.json();
      const formattedData = data.map(item => ({
        id: item.id,
        studentName: item.student_name,
        courseCode: item.course_code,
        courseName: item.course_name, // Added courseName mapping
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
        const response = await fetch(`http://localhost:5000/api/feedback/${id}`, {
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

  const renderView = () => {
    if (loading && currentView !== 'form') {
      return <div className="loading">Loading...</div>;
    }

    switch (currentView) {
      case 'form':
        return <FeedbackForm onFeedbackAdded={handleFeedbackAdded} />;
      case 'list':
        return <FeedbackList feedbacks={feedbacks} onDelete={handleDeleteFeedback} />;
      case 'dashboard':
      default:
        return <Dashboard feedbacks={feedbacks} />;
    }
  };

  return (
    <div className="App">
      {/* Notification System */}
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <header className="app-header">
        <div className="header-content">
          <h1>Student Feedback System</h1>
          <p>Share your learning experience</p>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-btn ${currentView === 'form' ? 'active' : ''}`}
            onClick={() => setCurrentView('form')}
          >
            Submit Feedback
          </button>
          <button 
            className={`nav-btn ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            View All Feedback
          </button>
        </nav>
      </header>
      
      <main className="app-main">
        {renderView()}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Student Feedback System.</p>
      </footer>
    </div>
  );
}

export default App;