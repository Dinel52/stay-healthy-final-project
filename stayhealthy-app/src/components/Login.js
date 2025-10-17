import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Validacija Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
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
      const userData = {
        email: formData.email,
        name: 'John Doe',
        userType: 'patient'
      };
      
      login(userData);
      showNotification('Login successful! Welcome back.', 'success');
      navigate('/');
    } catch (error) {
      showNotification('Login failed. Please try again.', 'error');
    }
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;