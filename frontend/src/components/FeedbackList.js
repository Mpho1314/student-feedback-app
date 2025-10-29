import './FeedbackList.css';

export default function FeedbackList({ feedbacks, onDelete }) {
  if (feedbacks.length === 0) {
    return (
      <div className="feedback-list-empty">
        <h3>No Feedback Submitted</h3>
        <p>Be the first to share your feedback!</p>
      </div>
    );
  }

  return (
    <div className="feedback-list">
      <div className="feedback-list-header">
        <h2>All Feedback</h2>
        <p className="feedback-count">{feedbacks.length} feedback entries</p>
      </div>
      
      <div className="feedback-cards">
        {feedbacks.map(feedback => (
          <div key={feedback.id} className="feedback-card">
            <div className="card-header">
              <div className="student-info">
                <h3 className="student-name">{feedback.studentName}</h3>
                <div className="course-info">
                  <span className="course-code">{feedback.courseCode}</span>
                  <span className="course-name">{feedback.courseName}</span>
                </div>
              </div>
              <div className="rating-display">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < feedback.rating ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
                <span className="rating-number">({feedback.rating}/5)</span>
              </div>
            </div>
            
            <div className="card-content">
              <p className="comments">{feedback.comments}</p>
            </div>
            
            <div className="card-footer">
              <span className="timestamp">
                {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <button 
                className="delete-btn"
                onClick={() => onDelete(feedback.id)}
                title="Delete feedback"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}