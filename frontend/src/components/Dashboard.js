import './Dashboard.css';

export default function Dashboard({ feedbacks }) {
  const totalFeedbacks = feedbacks.length;
  const averageRating = totalFeedbacks > 0 
    ? (feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / totalFeedbacks).toFixed(1)
    : 0;

  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: feedbacks.filter(fb => fb.rating === rating).length,
    percentage: totalFeedbacks > 0 ? (feedbacks.filter(fb => fb.rating === rating).length / totalFeedbacks * 100).toFixed(1) : 0
  }));

  const recentFeedbacks = [...feedbacks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2>Feedback Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <div className="stat-number">{totalFeedbacks}</div>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <div className="stat-number">{averageRating}</div>
          <div className="stat-subtitle">out of 5</div>
        </div>
        <div className="stat-card">
          <h3>Courses</h3>
          <div className="stat-number">
            {new Set(feedbacks.map(fb => fb.courseCode)).size}
          </div>
          <div className="stat-subtitle">unique</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="rating-section">
          <div className="rating-distribution">
            <h3>Rating Distribution</h3>
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="rating-bar">
                <span className="rating-label">{rating}★</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="rating-count">
                  {count} ({percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-feedbacks">
          <h3>Recent Feedback</h3>
          <div className="feedback-table-container">
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Rating</th>
                  <th>Comments Preview</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentFeedbacks.length > 0 ? (
                  recentFeedbacks.map(feedback => (
                    <tr key={feedback.id}>
                      <td className="student-cell">
                        <div className="student-name">{feedback.studentName}</div>
                      </td>
                      <td className="course-cell">
                        <span className="course-badge">{feedback.courseCode}</span>
                      </td>
                      <td className="course-name-cell">
                        <div className="course-name" title={feedback.courseName}>
                          {feedback.courseName && feedback.courseName.length > 30 
                            ? `${feedback.courseName.substring(0, 30)}...`
                            : feedback.courseName || 'General Course'
                          }
                        </div>
                      </td>
                      <td className="rating-cell">
                        <div className="table-rating">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={i < feedback.rating ? 'star filled' : 'star'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="comments-cell">
                        <div className="comments-preview" title={feedback.comments}>
                          {feedback.comments.length > 50 
                            ? `${feedback.comments.substring(0, 50)}...`
                            : feedback.comments
                          }
                        </div>
                      </td>
                      <td className="date-cell">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No feedback available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}