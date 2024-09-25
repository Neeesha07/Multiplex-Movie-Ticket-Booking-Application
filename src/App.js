import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import {BrowserRouter as   Router, Routes , Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import SeatBooking from './components/SeatBooking';
import Navbar from './components/Navbar';
import DiscountList from './components/DiscountList';

function App() {
  return (
    <Router>
    <div className="App">
      
      <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
          <Route path="/discounts" element={<DiscountList />} />
          <Route path="/seats" element={<SeatBooking/>} />
          
        </Routes>
    </div>
    </Router>
  );
}

export default App;
