import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ show, handleClose, movie }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleConfirmBooking = () => {
    if (selectedDate) {
      navigate(`/confirm-booking/${selectedDate}`, { state: { movie } });
    } else {
      alert('Please select a date before confirming.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Tickets for {movie?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              min={getCurrentDate()}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirmBooking}>
          Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;