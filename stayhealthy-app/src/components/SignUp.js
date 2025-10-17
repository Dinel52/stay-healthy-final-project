import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userType: '',
    email: '',
    name: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Validacija User Type
    if (!formData.userType) {
      newErrors.userType = 'Please select a user type';
    }

    // Validacija Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Validacija Name
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validacija Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      // Simulacija backend API call
      // U realnoj aplikaciji: const response = await fetch('/api/signup', {...})
      
      const userData = {
        email: formData.email,
        name: formData.name,
        userType: formData.userType
      };
      
      login(userData);
      alert('Sign up successful!');
      navigate('/');
    } catch (error) {
      alert('Sign up failed. Please try again.');
    }
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Očisti grešku za polje koje se mijenja
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>SignUp</h2>

        <div className="form-group">
          <label>User Type:</label>
          <select 
            name="userType" 
            value={formData.userType} 
            onChange={handleChange}
            className={errors.userType ? 'error' : ''}
          >
            <option value="">Select (Patient/Doctor/Admin)</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          {errors.userType && <span className="error-message">{errors.userType}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;