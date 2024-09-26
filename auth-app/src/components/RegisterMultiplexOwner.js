import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/auth/authAPI';
import axios from 'axios';

const RegisterMultiplexOwner = () => {
    const [mowner, setMownerData] = useState({
        username: '',
        email: '',
        password: '',
        foreignUserId: ''
        
       
    });
   

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMownerData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, password } = mowner;
            // Register user
            const userResponse = await registerUser({ username, password, role: 'MOWNER' });
            const foreignUserId1 = userResponse.userId;

            // Add multiplex details
            await axios.post('http://localhost:8888/multiplex-ms/addowner', {
                multiplexOwnerName: mowner.username,
                foreignUserId : foreignUserId1,
                multiplexOwnerMail: mowner.email
            });

    

            navigate('/login'); // Redirect after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Multiplex Owner Details</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterMultiplexOwner;
