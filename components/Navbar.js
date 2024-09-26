import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-light" >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/discounts" className="nav-link text-light" >Discounts</Link>
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
                            <li><Link to="/your-orders" className="dropdown-item">Your Orders</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link to="/logout" className="dropdown-item">Log Out</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;