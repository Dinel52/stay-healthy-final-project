import React from 'react';
import InstantConsultationCard from '../components/InstantConsultation.js';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Your Health, Our Priority</h1>
        <p>Book appointments with top doctors instantly</p>
      </section>

      <InstantConsultationCard />

    </div>
  );
}

export default Home;