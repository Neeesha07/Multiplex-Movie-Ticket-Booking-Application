import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const UpdateMovieForm = ({ ownerId }) => {
    const [show, setShow] = useState(false);
    const [multiplexes, setMultiplexes] = useState([]);
    const [selectedMultiplex, setSelectedMultiplex] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [movieDetails, setMovieDetails] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        setError('');
        setSelectedMultiplex('');
        setSelectedMovie('');
        setMovieDetails({});
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            setLoading(true);
            axios.get(`http://localhost:8081/multiplex/getMultiplex/1`)
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

    const handleMultiplexChange = (e) => {
        const multiplexId = e.target.value;
        setSelectedMultiplex(multiplexId);
        setSelectedMovie('');
        setMovieDetails({});
        setLoading(true);

        axios.get(`http://localhost:8081/multiplex/getMovies/${multiplexId}`)
            .then((response) => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
                setError('Failed to load movies. Please try again.');
                setLoading(false);
            });
    };

    const handleMovieChange = (e) => {
        const movieId = e.target.value;
        setSelectedMovie(movieId);
        setLoading(true);

        axios.get(`http://localhost:8081/multiplex/moviebyId/${movieId}`)
            .then((response) => {
                setMovieDetails(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movie details:', error);
               
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!selectedMovie) {
            setError('Please select a movie to update.');
            return;
        }

        // Create the ticket object with the updated movie details
        const ticketObject = {
            movieId: selectedMovie,
            ...movieDetails // Spread the current movie details into the object
        };

        try {
            setLoading(true);
            await axios.put(`http://localhost:8081/multiplex/updatemoviedetails/${selectedMovie}`, ticketObject);
            handleClose();
            // You might want to add a success message or refresh the movie list here
        } catch (error) {
            console.error('Error updating movie:', error);
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
                Edit Movie
            </Button>

            <Modal show={show} onHide={handleClose} className="bg-dark text-light" centered>
            <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Update Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group className="mb-3" controlId="multiplexDropdown">
                            <Form.Label>Choose Multiplex</Form.Label>
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

                        {selectedMultiplex && (
                            <Form.Group className="mb-3" controlId="movieDropdown">
                                <Form.Label>Choose Movie</Form.Label>
                                <Form.Select
                                    value={selectedMovie}
                                    onChange={handleMovieChange}
                                    disabled={loading}
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
                        )}

                        {selectedMovie && (
                            <>
                                <Form.Group className="mb-3" controlId="movieName">
                                    <Form.Label>Movie Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="movieName"
                                        value={movieDetails.movieName || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter movie name"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="movieDuration">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="movieDuration"
                                        value={movieDetails.movieDuration || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter duration"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="movieGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="movieGenre"
                                        value={movieDetails.movieGenre || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter genre"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="movieRating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="movieRating"
                                        value={movieDetails.movieRating || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter Rating"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="movieDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="movieDescription"
                                        value={movieDetails.movieDescription || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter Description"
                                    />
                                </Form.Group>

                                {/* Add more fields as necessary */}
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit} 
                        disabled={!selectedMovie || loading}
                        className="shadow-sm"
                    >
                        {loading ? 'Updating...' : 'Update Movie'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateMovieForm;
