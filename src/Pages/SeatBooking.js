import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles.css';

const SeatBooking = () => {
  const [seats, setSeats] = useState({ availableSeats: [], bookedSeats: [] });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { screeningId } = useParams();
  const screenId=screeningId;
  const location = useLocation();
  const { movie } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`http://win10-2-186:8888/multiplex-ms/getavailableseats/${screeningId}`); // Ensure you use http://
        if (!response.ok) throw new Error("Failed to fetch available seats");
        const seatData = await response.json();
        setSeats(seatData); // Assuming the response is an object with available and booked arrays
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSeats();
  }, [screeningId]);

  const handleSeatClick = (seat) => {
    setSelectedSeats(prevSelected => 
      prevSelected.includes(seat)
        ? prevSelected.filter(s => s !== seat)
        : [...prevSelected, seat]
    );
  };

  const handleBooking = () => {
    navigate(`/confirm-booking/${screenId}`,{ state: { selectedSeats } });
  };

  const handleReset = () => {
    setSelectedSeats([]); // Deselect all seats
  };

  const getSeatColor = (seat) => {
    if (seats.bookedSeats.includes(seat)) return 'occupied';
    if (selectedSeats.includes(seat)) return 'selected';
    if (seat <= 40) return 'silver';
    if (seat <= 56) return 'gold';
    return 'premium';
  };

  if (loading) return <p>Loading Seats...</p>;
  if (error) return <p>Error: {error}</p>;

  

  return (
    <div className="SeatBooking">
      <h2>Select Your Seats</h2>
      
      <div className="Cinema">
        <div className="screen" />
        <div className="Legend">
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
              onClick={() => seats.bookedSeats && !seats.bookedSeats.includes(seat) && handleSeatClick(seat)}
            />
          ))}
        </div>
      </div>

      <p>Selected seats: {selectedSeats.join(', ')}</p>
      <div className='pb-4'>
        <button onClick={handleBooking} disabled={selectedSeats.length === 0}>
          Book Selected Seats
        </button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;
