import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import './ReviewForm.css';

function ReviewForm() {
  const [formData, setFormData] = useState({
    doctorName: '',
    rating: '',
    review: ''
  });
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const isFormValid = formData.doctorName && formData.rating && formData.review;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.doctorName || !formData.rating || !formData.review) {
      showNotification('Please fill in all fields', 'warning');
      return;
    }

    const newReview = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };

    setSubmittedReviews([newReview, ...submittedReviews]);
    showNotification('Review submitted successfully!', 'success');
    
    // Reset form
    setFormData({
      doctorName: '',
      rating: '',
      review: ''
    });
  };

  return (
    <div className="review-container">
      <h2>Give Your Feedback</h2>
      
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            name="doctorName"
            placeholder="Enter doctor's name"
            value={formData.doctorName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value="">Select Rating</option>
            <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
            <option value="4">⭐⭐⭐⭐ (Very Good)</option>
            <option value="3">⭐⭐⭐ (Good)</option>
            <option value="2">⭐⭐ (Fair)</option>
            <option value="1">⭐ (Poor)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your Review</label>
          <textarea
            name="review"
            placeholder="Share your experience..."
            value={formData.review}
            onChange={handleChange}
            rows="5"
          />
        </div>

       <button 
        type="submit" 
        className="submit-review-btn"
        disabled={!isFormValid} 
      >
        Submit Review
      </button>
      </form>

      {submittedReviews.length > 0 && (
        <div className="reviews-list">
          <h3>Recent Reviews</h3>
          {submittedReviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h4>Dr. {review.doctorName}</h4>
                <span className="review-rating">
                  {'⭐'.repeat(parseInt(review.rating))}
                </span>
              </div>
              <p className="review-text">{review.review}</p>
              <span className="review-date">{review.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewForm;