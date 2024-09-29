import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { PlusCircle, Film, Calendar, Clock } from 'lucide-react';

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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        resetForm();
    };
    const handleShow = () => setShow(true);

    const resetForm = () => {
        setSelectedMultiplex('');
        setSelectedMovie('');
        setSelectedDate('');
        setSelectedTime('');
        setError('');
    };

    useEffect(() => {
        if (show) {
            setLoading(true);
            axios.get(`http://win10-2-186:8888/multiplex-ms/getMultiplex/${ownerId}`)
                .then((response) => {
                    setMultiplexes(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching multiplexes:', error);
                    setError('Failed to load multiplexes. Please try again.');
                    setLoading(false);
                });
        }
    }, [show, ownerId]);

    useEffect(() => {
        if (selectedMultiplex) {
            setLoading(true);
            axios.get(`http://win10-2-186:8888/multiplex-ms/getMovies/${selectedMultiplex}`)
                .then((response) => {
                    setMovies(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching movies:', error);
                    setError('Failed to load movies. Please try again.');
                    setLoading(false);
                });
        }
    }, [selectedMultiplex]);

    const handleMultiplexChange = (e) => {
        const multiplexId = e.target.value;
        setSelectedMultiplex(multiplexId);
        setSelectedMovie('');
        setSelectedDate('');
        setSelectedTime('');
        const multiplex = multiplexes.find(m => m.multiplexId === Number(multiplexId));
        
        if (multiplex) {
            const dateKeys = Object.keys(multiplex.availableScreensPerTimeslot);
            const uniqueDates = [...new Set(dateKeys.map(dateTime => dateTime.split('T')[0]))];
            setAvailableDates(uniqueDates);
        }
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        setSelectedTime('');

        const multiplex = multiplexes.find(m => m.multiplexId === Number(selectedMultiplex));
        if (multiplex) {
            const filteredTimes = Object.keys(multiplex.availableScreensPerTimeslot)
                .filter(dateTime => dateTime.startsWith(date))
                .map(dateTime => dateTime.split('T')[1]);
            setAvailableTimes(filteredTimes);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        const timeSlot = `${selectedDate}T${selectedTime}`;

        try {
            await axios.post(`http://win10-2-186:8888/multiplex-ms/addscreening/${selectedMovie}`, {
                timeSlot
            });
            handleClose();
            // Optionally add success notification or refresh here
        } catch (error) {
            console.error('Error adding screening:', error);
            setError('Failed to add screening. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="dark"
                className="d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '100%', height: '60px', borderRadius: '10px' }}
                onClick={handleShow}
            >
                <PlusCircle className="me-2" />
                Add Screening
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Add Screening</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group className="mb-3" controlId="multiplexDropdown">
                            <Form.Label><Film className="me-2" />Choose Multiplex</Form.Label>
                            <Form.Select 
                                value={selectedMultiplex} 
                                onChange={handleMultiplexChange}
                                disabled={loading}
                                className="shadow-sm"
                            >
                                <option value="">Select Multiplex</option>
                                {multiplexes.map((multiplex) => (
                                    <option key={multiplex.multiplexId} value={multiplex.multiplexId}>
                                        {multiplex.multiplexName}, {multiplex.multiplexLocation}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="movieDropdown">
                            <Form.Label><Film className="me-2" />Choose Movie</Form.Label>
                            <Form.Select 
                                value={selectedMovie} 
                                onChange={(e) => setSelectedMovie(e.target.value)}
                                disabled={!selectedMultiplex || loading}
                                className="shadow-sm"
                            >
                                <option value="">Select Movie</option>
                                {movies.map((movie) => (
                                    <option key={movie.movieId} value={movie.movieId}>
                                        {movie.movieName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dateDropdown">
                            <Form.Label><Calendar className="me-2" />Select Date</Form.Label>
                            <Form.Select 
                                value={selectedDate} 
                                onChange={handleDateChange}
                                disabled={!selectedMovie || loading}
                                className="shadow-sm"
                            >
                                <option value="">Select Date</option>
                                {availableDates.map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="timeDropdown">
                            <Form.Label><Clock className="me-2" />Select Time</Form.Label>
                            <Form.Select 
                                value={selectedTime} 
                                onChange={(e) => setSelectedTime(e.target.value)}
                                disabled={!selectedDate || loading}
                                className="shadow-sm"
                            >
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
                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        variant="dark" 
                        onClick={handleSubmit} 
                        disabled={!selectedMovie || !selectedDate || !selectedTime || loading}
                        className="shadow-sm"
                    >
                        {loading ? <><Spinner animation="border" size="sm" /> Adding...</> : 'Add Screening'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddScreeningForm;
