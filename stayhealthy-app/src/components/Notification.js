import React, { useState, useEffect } from 'react';
import './Notification.css';

function Notification({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000); // Auto-close nakon 5 sekundi

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <span className="notification-message">{message}</span>
        <button 
          className="notification-close" 
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Notification;