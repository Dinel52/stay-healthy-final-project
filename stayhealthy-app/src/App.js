import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import FindDoctorSearch from './components/FindDoctorSearch';
import './App.css';
import ReviewForm from './components/ReviewForm';
import InstantConsultation from './components/InstantConsultation.js';
import ProfileCard from './components/ProfileCard';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router basename="/stay-healthy-final-project">
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointments" element={<FindDoctorSearch />} />
              <Route path="/reviews" element={<ReviewForm />} />
              <Route path="/instant-consultation" element={<InstantConsultation />} />
              <Route path="/profile" element={<ProfileCard />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;