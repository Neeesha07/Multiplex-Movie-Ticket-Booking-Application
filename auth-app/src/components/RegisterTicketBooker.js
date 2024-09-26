import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/auth/authAPI';
import axios from 'axios';

const RegisterTicketBooker = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        contactNo: '',
        foreignUserId:''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, password } = formData;
            // Register user
            const userResponse = await registerUser({ username, password, role: 'CUST' });
             const foreignUserId1 = userResponse.userId;

            // Add booker details
            await axios.post('http://localhost:8888/ticketBooker/addbooker', {
                bookerName: formData.username,
                bookerMail: formData.email,
                bookerPassword: formData.password,
                bookerContact: formData.contactNo,
                foreignUserId: foreignUserId1
            });

            navigate('/login'); // Redirect after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2> Register Customer</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="contactNo" type="tel" placeholder="Contact No." onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterTicketBooker;
