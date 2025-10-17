import React, { useState } from 'react';
import './FindDoctorSearch.css';

function FindDoctorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Dummy data za doktore
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', location: 'New York' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatology', location: 'Los Angeles' },
    { id: 3, name: 'Dr. Emily Williams', specialty: 'Pediatrics', location: 'Chicago' },
    { id: 4, name: 'Dr. James Brown', specialty: 'Orthopedics', location: 'Houston' },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Neurology', location: 'Phoenix' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="find-doctor-container">
      <h2>Find a Doctor</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by name, specialty, or location..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results ({searchResults.length})</h3>
          {searchResults.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-info">
                <h4>{doctor.name}</h4>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Location:</strong> {doctor.location}</p>
              </div>
              <button className="book-appointment-btn">Book Appointment</button>
            </div>
          ))}
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <div className="no-results">
          <p>No doctors found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default FindDoctorSearch;