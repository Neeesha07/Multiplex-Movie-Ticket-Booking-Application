import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OwnerDashboard from './OwnerDashboard'; // Import the new dashboard component

const App = () => {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<OwnerDashboard />} /> {/* New Route */}
      </Routes>
    </Router>
  );
};

export default App;
