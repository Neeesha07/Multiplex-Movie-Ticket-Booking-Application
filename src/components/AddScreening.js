import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AddScreeningForm = ({ ownerId }) => {
    const [show, setShow] = useState(false);
    const [multiplexes, setMultiplexes] = useState([]);
    const [selectedMultiplex, setSelectedMultiplex] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    // Open/Close Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch multiplexes when modal is opened
    useEffect(() => {
        if (show) {
            axios.get(`http://localhost:8081/multiplex/getMultiplex/1`)
                .then((response) => setMultiplexes(response.data))
                .catch((error) => console.error('Error fetching multiplexes:', error));
        }
    }, [show, ownerId]);

    // Fetch movies for selected multiplex
    useEffect(() => {
        if (selectedMultiplex) {
            axios.get(`http://localhost:8081/multiplex/getMovies/${selectedMultiplex}`)
                .then((response) => setMovies(response.data))
                .catch((error) => console.error('Error fetching movies:', error));
        }
    }, [selectedMultiplex]);

    // Handle multiplex selection and extract available dates
    const handleMultiplexChange = (e) => {
        const multiplexId = e.target.value;
        setSelectedMultiplex(multiplexId);
        const multiplex = multiplexes.find(m => m.multiplexId === Number(multiplexId));
        
        // Extract dates from availableScreensPerTimeslot
        if (multiplex) {
            const dateKeys = Object.keys(multiplex.availableScreensPerTimeslot);
            const uniqueDates = [...new Set(dateKeys.map(dateTime => dateTime.split('T')[0]))];
            setAvailableDates(uniqueDates); // Dates only (no times)
        }
    };

    // Handle date selection and filter available times
    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        // Filter time slots for the selected date
        const multiplex = multiplexes.find(m => m.multiplexId === Number(selectedMultiplex));
        if (multiplex) {
            const filteredTimes = Object.keys(multiplex.availableScreensPerTimeslot)
                .filter(dateTime => dateTime.startsWith(date))
                .map(dateTime => dateTime.split('T')[1]); // Extract time part
            setAvailableTimes(filteredTimes); // Set available time slots
        }
    };

    // Handle form submission (POST request)
    const handleSubmit = async () => {
        const timeSlot = `${selectedDate}T${selectedTime}`;

        try {
            await axios.post(`http://localhost:8081/multiplex/addscreening/${selectedMovie}`, {
                timeSlot
            });
            alert('Screening added successfully!');
            handleClose(); // Close modal after submission
        } catch (error) {
            alert('Error adding screening!');
            console.error(error);
        }
    };

    return (
        <>
            <Button
                variant="dark"
                className="mb-3"
                style={{ width: '200px', height: '60px', border: 'none' }}
                onClick={handleShow}
            >
                Add Screening
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Screening</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Multiplex Dropdown */}
                        <Form.Group className="mb-3" controlId="multiplexDropdown">
                            <Form.Label>Choose Multiplex</Form.Label>
                            <Form.Select value={selectedMultiplex} onChange={handleMultiplexChange}>
                                <option value="">Select Multiplex</option>
                                {multiplexes.map((multiplex) => (
                                    <option key={multiplex.multiplexId} value={multiplex.multiplexId}>
                                        {multiplex.multiplexName}, {multiplex.multiplexLocation}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Movie Dropdown */}
                        <Form.Group className="mb-3" controlId="movieDropdown">
                            <Form.Label>Choose Movie</Form.Label>
                            <Form.Select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
                                <option value="">Select Movie</option>
                                {movies.map((movie) => (
                                    <option key={movie.movieId} value={movie.movieId}>
                                        {movie.movieName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Date Dropdown */}
                        <Form.Group className="mb-3" controlId="dateDropdown">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Select value={selectedDate} onChange={handleDateChange}>
                                <option value="">Select Date</option>
                                {availableDates.map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Time Dropdown */}
                        <Form.Group className="mb-3" controlId="timeDropdown">
                            <Form.Label>Select Time</Form.Label>
                            <Form.Select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                                <option value="">Select Time</option>
                                {availableTimes.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit} 
                        disabled={!selectedMovie || !selectedDate || !selectedTime}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddScreeningForm;
