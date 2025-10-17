import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/stethoscope-icon.png" alt="StayHealthy" />
      </div>
      
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/instant-consultation">Instant Consultation</Link>
        {isAuthenticated ? (
          <>
            <span className="user-name">Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;