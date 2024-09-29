import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const NavbarMultiplex = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-light">Home</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <button
                            className="btn btn-light dropdown-toggle d-flex align-items-center" // Change to btn-light for a white button
                            onClick={toggleDropdown}
                            aria-expanded={dropdownOpen}
                            style={{ color: 'black' }} // Set text color to black
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
                            
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link to="/logout" className="dropdown-item">Log Out</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarMultiplex;
