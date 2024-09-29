import logo from './logo.svg';
import './App.css';
import Dashboard from './Pages/Dashboard';
import {BrowserRouter as   Router, Routes , Route, Navigate } from 'react-router-dom';
import MovieDetails from './Pages/MovieDetails';
import SeatBooking from './Pages/SeatBooking';
import Navbar from './components/Navbar';
import DiscountList from './Pages/DiscountList';
import TicketList from './Pages/TicketList';
import MultiplexListForMovie from './Pages/MultiplexListForMovie';
import MultiplexList from './Pages/MultiplexList';
import MoviesListForMultiplex from './Pages/MoviesListForMultiplex';
import EditUserProfile from './Pages/EditUserProfile';
import BillingPage from './Pages/BillingPage';
import PaymentPage from './Pages/PaymentPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import AddFeedback from './components/AddFeedback';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';
import RegisterMultiplexOwner from './components/RegisterMultiplexOwner';
import RegisterTicketBooker from './components/RegisterTicketBooker';
import MultiplexDashBoard from './Pages/MultiplexDashBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerDashboard from './Pages/OwnerDashboard';
import FeedbacksPage from './Pages/Feedback';

function App() {
  return (
    <Router>
    <div className="App">
      
      <Routes>
          <Route path="/ticketBooker/dashboard" element={<Dashboard/>} />
          <Route path="/movie/:movieName" element={<MovieDetails/>} />
          <Route path="/discounts" element={<DiscountList />} />
          <Route path="/seats/:movieName/:screeningId" element={<SeatBooking/>} />
          <Route path="/your-orders" element={<TicketList/>} />
          <Route path="/Available_multiplexes/:selectedDate" element={<MultiplexListForMovie/>} />
          <Route path='/multiplexList' element={<MultiplexList/>} />
          <Route path='/moviesListForMultiplex/:multiplexId/:selectedDate' element={<MoviesListForMultiplex/>} />
          <Route path='/edit-profile' element={<EditUserProfile/>} />
          <Route path='/confirm-booking/:screenId' element={<BillingPage/>} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-owner" element={<RegisterMultiplexOwner />} />
          <Route path="/register-booker" element={<RegisterTicketBooker />} />
          <Route path="/multiplex-ms/dashboard/:userid" element={<MultiplexDashBoard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />  
          <Route path="/admin/dashboard" element={<OwnerDashboard/>} />  
          <Route path="/feedbacks" element={<FeedbacksPage />} />


        </Routes>
    </div>
    </Router>
  );
}

export default App;
