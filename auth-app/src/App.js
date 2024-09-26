import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterMultiplexOwner from './components/RegisterMultiplexOwner';
import RegisterTicketBooker from './components/RegisterTicketBooker';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/DashBoard';


const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register-owner" element={<RegisterMultiplexOwner />} />
                    <Route path="/register-booker" element={<RegisterTicketBooker />} />
                    <Route path="/multiplex/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
