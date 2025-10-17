import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import './ProfileCard.css';

function ProfileCard() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    dateOfBirth: '1990-01-15',
    gender: 'Male'
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showNotification('Profile updated successfully!', 'success');
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profileData.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {!isEditing ? (
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{profileData.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{profileData.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{profileData.phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{profileData.address}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date of Birth:</span>
              <span className="detail-value">{profileData.dateOfBirth}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gender:</span>
              <span className="detail-value">{profileData.gender}</span>
            </div>
            
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-profile-btn"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-edit-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={profileData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="save-btn">Save Changes</button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;