import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BillingPage from './BillingPage';
import PaymentPage from './PaymentPage'; // Assume you will create this
import ConfirmationPage from './ConfirmationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BillingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} /> {/* Add the route for ConfirmationPage */}

      </Routes>
    </Router>
  );
};

export default App;
