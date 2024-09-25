import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'
const SeatBooking = ({ screeningId }) => {
  const [seats, setSeats] = useState({ available: [], booked: [] });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         const response = await axios.get(`/api/screenings/${screeningId}/seats`);
//         setSeats(response.data);
//       } catch (error) {
//         console.error('Error fetching seats:', error);
//       }
//     };

//     fetchSeats();
//   }, [screeningId]);

  const handleSeatClick = (seat) => {
    setSelectedSeats(prevSelected => 
      prevSelected.includes(seat)
        ? prevSelected.filter(s => s !== seat)
        : [...prevSelected, seat]
    );
  };

  const handleBooking = () => {
    navigate('/confirm-booking', { 
      state: { selectedSeats, screeningId } 
    });
  };

  const handleReset = () => {
    setSelectedSeats([]); // Deselect all seats
  };

  const getSeatColor = (seat) => {
    if (seats.booked.includes(seat)) return 'occupied';
    if (selectedSeats.includes(seat)) return 'selected';
    if (seat <= 40) return 'silver';
    if (seat <= 56) return 'gold';
    return 'premium';
  };

  return (
    <div className="SeatBooking">
      <h2>Select Your Seats</h2>
      
      <div className="Cinema">
        <div className="screen" />
        <div className="Legend ">
        <div><span className="seat premium" /> Premium</div>
        <div><span className="seat gold" /> Gold</div>
        <div><span className="seat silver" /> Silver</div>
        <div><span className="seat selected" /> Selected</div>
        <div><span className="seat occupied" /> Occupied</div>
      </div>

        <div className="seats">
          {Array.from({ length: 64 }, (_, i) => i + 1).map(seat => (
            <span
              key={seat}
              className={`seat ${getSeatColor(seat)}`}
              onClick={() => !seats.booked.includes(seat) && handleSeatClick(seat)}
            >
            </span>
          ))}
        </div>
      </div>

      
      <p>Selected seats: {selectedSeats.join(', ')}</p>
      <div className='pb-4' >
      <button  onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Book Selected Seats
      </button>
      <button onClick={handleReset} style={{marginLeft:'10px'}}>
        Reset
      </button>
      </div>

    </div>
  );
};

export default SeatBooking;