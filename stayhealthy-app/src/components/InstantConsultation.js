import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import './InstantConsultation.css';

function InstantConsultation() {
  const [concern, setConcern] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!concern.trim()) {
      showNotification('Please describe your health concern', 'warning');
      return;
    }

    setIsSubmitted(true);
    showNotification('Consultation request submitted! A doctor will contact you shortly.', 'success');
  };

  const handleReset = () => {
    setConcern('');
    setIsSubmitted(false);
  };

  return (
    <div className="instant-consultation-container">
      <h2>Instant Consultation</h2>
      <p className="subtitle">Get medical advice within minutes</p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="consultation-form">
          <div className="form-group">
            <label>Describe your health concern:</label>
            <textarea
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder="Please describe your symptoms, concerns, or questions..."
              rows="8"
              className="concern-textarea"
            />
          </div>

          <div className="info-box">
            <h4>What to expect:</h4>
            <ul>
              <li>✓ Response within 15-30 minutes</li>
              <li>✓ Licensed medical professionals</li>
              <li>✓ Confidential and secure</li>
              <li>✓ Follow-up support available</li>
            </ul>
          </div>

          <button type="submit" className="submit-consultation-btn">
            Submit Consultation Request
          </button>
        </form>
      ) : (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Consultation Request Submitted!</h3>
          <p>A qualified doctor will review your concern and contact you shortly.</p>
          <p className="concern-display">
            <strong>Your concern:</strong><br />
            {concern}
          </p>
          <button onClick={handleReset} className="new-consultation-btn">
            Submit Another Consultation
          </button>
        </div>
      )}
    </div>
  );
}

export default InstantConsultation;