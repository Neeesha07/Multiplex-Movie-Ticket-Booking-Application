// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import AddFeedback from './AddFeedback'; // Import AddFeedback

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false); // State for feedback modal

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleFeedbackModalOpen = () => {
        setShowFeedbackModal(true);
    };

    const handleFeedbackModalClose = () => {
        setShowFeedbackModal(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000000' }}>
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-light">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/discounts" className="nav-link text-light">Discounts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/multiplexList" className="nav-link text-light">Multiplex</Link>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="nav-link text-light btn" 
                                onClick={handleFeedbackModalOpen} // Open modal on click
                            >
                                Feedback
                            </button>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle d-flex align-items-center"
                                onClick={toggleDropdown}
                                aria-expanded={dropdownOpen}
                            >
                                <User className="me-2" size={24} />
                                Profile
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end${dropdownOpen ? ' show' : ''}`}
                                style={{
                                    right: 0,
                                    left: 'auto',
                                    minWidth: '200px',
                                    maxWidth: '100%'
                                }}
                            >
                                <li><Link to="/edit-profile" className="dropdown-item">Edit Profile</Link></li>
                                <li><Link to="/your-orders" className="dropdown-item">Your Bookings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link to="/logout" className="dropdown-item">Log Out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Render the AddFeedback modal */}
            <AddFeedback show={showFeedbackModal} handleClose={handleFeedbackModalClose} />
        </>
    );
};

export default Navbar;
