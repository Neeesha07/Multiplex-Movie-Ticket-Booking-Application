import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const DeleteMovieForm = ({ ownerId }) => {
    const [show, setShow] = useState(false);
    const [multiplexes, setMultiplexes] = useState([]);
    const [selectedMultiplex, setSelectedMultiplex] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        setError('');
        setSelectedMultiplex('');
        setSelectedMovie('');
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            setLoading(true);
            axios.get(`http://win10-2-186:8888/multiplex-ms/getMultiplex/1`)
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
        setLoading(true);

        axios.get(`http://win10-2-186:8888/multiplex-ms/getMovies/${multiplexId}`)
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
        setSelectedMovie(e.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedMovie) {
            setError('Please select a movie to delete.');
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`http://win10-2-186:8888/multiplex-ms/deletemovie/${selectedMovie}`);
            handleClose();
            // You might want to add a success message or refresh the movie list here
        } catch (error) {
            console.error('Error deleting movie:', error);
            setError('Failed to delete movie. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="danger"
                className="d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '100%', height: '60px', borderRadius: '10px' }}
                onClick={handleShow}
            >
                <Trash2 className="me-2" />
                Delete Movie
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Delete Movie</Modal.Title>
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
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={handleSubmit} 
                        disabled={!selectedMovie || loading}
                        className="shadow-sm"
                    >
                        {loading ? 'Deleting...' : 'Delete Movie'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteMovieForm;