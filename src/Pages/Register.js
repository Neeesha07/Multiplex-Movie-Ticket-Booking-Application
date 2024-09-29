import './register.css';
import React, { useState } from 'react';
import RegisterMultiplexOwner from '../components/RegisterMultiplexOwner';
import RegisterTicketBooker from '../components/RegisterTicketBooker';

const Register = () => {
  const [isMultiplexOwner, setIsMultiplexOwner] = useState(true);

  return (
    <div className="register-page">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="app-name">Helioflix</h1>
        <p className="slogan">Book movie ticket with ease </p>
      </nav>

      {/* Registration Card */}
      <div className="register-card">
        <h2>Register</h2>
        <button onClick={() => setIsMultiplexOwner(true)} className={isMultiplexOwner ? 'active' : ''}>
          Register Multiplex Owner
        </button>
        <button onClick={() => setIsMultiplexOwner(false)} className={!isMultiplexOwner ? 'active' : ''}>
          Register Ticket Booker
        </button>
        {isMultiplexOwner ? <RegisterMultiplexOwner /> : <RegisterTicketBooker />}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Helioflix. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
