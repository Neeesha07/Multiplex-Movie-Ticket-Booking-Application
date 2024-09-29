import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

const AddMovieForm = ({ ownerId }) => {
    const [show, setShow] = useState(false);
    const [multiplexes, setMultiplexes] = useState([]);
    const [selectedMultiplex, setSelectedMultiplex] = useState('');
    const [formData, setFormData] = useState({
        movieName: '',
        movieDuration: '',
        movieRating: '',
        movieDescription: '',
        movieGenre: '',
        moviePoster: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            axios.get(`http://win10-2-186:8888/multiplex-ms/getMultiplex/${ownerId}`)
                .then((response) => {
                    setMultiplexes(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching multiplexes:', error);
                    setError('Failed to load multiplexes. Please try again.');
                });
        }
    }, [show, ownerId]);

    const validateForm = () => {
        const { movieName, movieDuration, movieRating, movieDescription, movieGenre, moviePoster } = formData;
        setIsFormValid(!!(selectedMultiplex && movieName && movieDuration && movieRating && movieDescription && movieGenre && moviePoster));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        validateForm();
    };

    const handleMultiplexChange = (e) => {
        setSelectedMultiplex(e.target.value);
        validateForm();
    };

    const handleSubmit = async () => {
        if (!selectedMultiplex) {
            setError('Please select a multiplex');
            return;
        }

        const movieData = {
            movieName: formData.movieName,
            movieRating: formData.movieRating,
            movieGenre: formData.movieGenre,
            movieDuration: formData.movieDuration,
            movieDescription: formData.movieDescription,
            moviePoster: formData.moviePoster
        };

        try {
            await axios.post(`http://win10-2-186:8888/multiplex-ms/addmovie/${selectedMultiplex}`, movieData);
            handleClose();
            // You might want to add a success message or refresh the movie list here
        } catch (error) {
            setError('Error adding movie. Please try again.');
            console.error(error);
        }
    };

    return (
        <>
            <Button
                variant="dark" // Changed to dark
                className="d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '100%', height: '60px', borderRadius: '10px' }}
                onClick={handleShow}
            >
                <PlusCircle className="me-2" />
                Add Movie
            </Button>

            <Modal show={show} onHide={handleClose} centered size="lg" className="bg-dark text-light"> {/* Added bg-dark and text-light classes */}
                <Modal.Header closeButton className="bg-dark text-white"> {/* Changed to bg-dark */}
                    <Modal.Title>Add New Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-light"> {/* Changed to bg-dark and text-light */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group className="mb-3" controlId="multiplexDropdown">
                            <Form.Label>Choose Multiplex</Form.Label>
                            <Form.Select
                                value={selectedMultiplex}
                                onChange={handleMultiplexChange}
                                className="shadow-sm bg-dark text-light" // Changed to bg-dark and text-light
                            >
                                <option value="">Select Multiplex</option>
                                {multiplexes.length > 0 ? (
                                    multiplexes.map((multiplex) => (
                                        <option key={multiplex.multiplexId} value={multiplex.multiplexId}>
                                            {multiplex.multiplexName}, {multiplex.multiplexLocation}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No multiplexes available</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="movieName">
                                    <Form.Label>Movie Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="movieName" 
                                        value={formData.movieName} 
                                        onChange={handleChange} 
                                        placeholder="Enter movie name" 
                                        className="shadow-sm bg-dark text-light" // Changed to bg-dark and text-light
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="movieDuration">
                                    <Form.Label>Movie Duration</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="movieDuration" 
                                        value={formData.movieDuration} 
                                        onChange={handleChange} 
                                        placeholder="Enter movie duration" 
                                        className="shadow-sm bg-dark text-light" // Changed to bg-dark and text-light
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="movieRating">
                                    <Form.Label>Movie Rating</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="movieRating" 
                                        value={formData.movieRating} 
                                        onChange={handleChange} 
                                        placeholder="Enter movie rating (e.g., U, A)" 
                                        className="shadow-sm bg-dark text-light" // Changed to bg-dark and text-light
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="movieGenre">
                                    <Form.Label>Movie Genre</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="movieGenre" 
                                        value={formData.movieGenre} 
                                        onChange={handleChange} 
                                        placeholder="Enter movie genre" 
                                        className="shadow-sm bg-dark text-light" // Changed to bg-dark and text-light
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-3" controlId="movieDescription">
                            <Form.Label>Movie Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                name="movieDescription" 
                                value={formData.movieDescription} 
                                onChange={handleChange} 
                                placeholder="Enter movie description" 
                                className="shadow-sm bg-dark text-light" // Changed to bg-dark and text-light
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="moviePoster">
                            <Form.Label>Movie Poster URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="moviePoster" 
                                value={formData.moviePoster} 
                                onChange={handleChange} 
                                placeholder="Enter movie poster URL" 
                                className="shadow-sm bg-dark text-light" // Changed to bg-dark and text-light
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-dark"> {/* Changed to bg-dark */}
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit} 
                        disabled={!isFormValid}
                        className="shadow-sm"
                    >
                        Add Movie
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddMovieForm;