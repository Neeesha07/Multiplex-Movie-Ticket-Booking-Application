import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios'; // Axios to fetch multiplex data and handle form submission

const AddMovieForm = ({ ownerId }) => {
    const [show, setShow] = useState(false); // Modal visibility
    const [multiplexes, setMultiplexes] = useState([]); // Multiplex list
    const [selectedMultiplex, setSelectedMultiplex] = useState(''); // Selected multiplex ID
    const [formData, setFormData] = useState({
        movieName: '',
        movieDuration: '',
        movieRating: '',
        movieDescription: '',
        movieGenre: '',
        moviePoster: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    // Open/Close Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch multiplex data when the modal is shown
    useEffect(() => {
        if (show) {
            axios.get(`http://localhost:8081/multiplex/getMultiplex/1`)
                .then((response) => {
                    setMultiplexes(response.data); // Assume response.data is an array of multiplexes
                })
                .catch((error) => {
                    console.error('Error fetching multiplexes:', error);
                });
        }
    }, [show, ownerId]);

    // Validate form fields
    const validateForm = () => {
        const { movieName, movieDuration, movieRating, movieDescription, movieGenre, moviePoster } = formData;
        setIsFormValid(!!(selectedMultiplex && movieName && movieDuration && movieRating && movieDescription && movieGenre && moviePoster));
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        validateForm();
    };

    // Handle multiplex selection
    const handleMultiplexChange = (e) => {
        setSelectedMultiplex(e.target.value);
        validateForm(); // Re-validate when multiplex changes
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!selectedMultiplex) {
            alert('Please select a multiplex');
            return;
        }

        // Prepare the movie data to be sent to the backend
        const movieData = {
            movieName: formData.movieName,
            movieRating: formData.movieRating,
            movieGenre: formData.movieGenre,
            movieDuration: formData.movieDuration,
            movieDescription: formData.movieDescription,
            moviePoster: formData.moviePoster
        };

        try {
            // Send a POST request to the backend with the selected multiplexId
            await axios.post(`http://localhost:8081/multiplex/addmovie/${selectedMultiplex}`, movieData);
            alert('Movie added successfully!');
            handleClose(); // Close modal after submission
        } catch (error) {
            alert('Error adding movie!');
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
                Add Movie
            </Button>

            {/* Modal for Add Movie */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Multiplex Dropdown */}
                        <Form.Group className="mb-3" controlId="multiplexDropdown">
                            <Form.Label>Choose Multiplex</Form.Label>
                            <Form.Select
                                value={selectedMultiplex}
                                onChange={handleMultiplexChange}
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

                        {/* Movie Fields */}
                        <Form.Group className="mb-3" controlId="movieName">
                            <Form.Label>Movie Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="movieName" 
                                value={formData.movieName} 
                                onChange={handleChange} 
                                placeholder="Enter movie name" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="movieDuration">
                            <Form.Label>Movie Duration</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="movieDuration" 
                                value={formData.movieDuration} 
                                onChange={handleChange} 
                                placeholder="Enter movie duration" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="movieRating">
                            <Form.Label>Movie Rating</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="movieRating" 
                                value={formData.movieRating} 
                                onChange={handleChange} 
                                placeholder="Enter movie rating (e.g., U, A)" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="movieGenre">
                            <Form.Label>Movie Genre</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="movieGenre" 
                                value={formData.movieGenre} 
                                onChange={handleChange} 
                                placeholder="Enter movie genre" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="movieDescription">
                            <Form.Label>Movie Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="movieDescription" 
                                value={formData.movieDescription} 
                                onChange={handleChange} 
                                placeholder="Enter movie description" 
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
                            />
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
                        disabled={!isFormValid} // Disable until form is valid
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddMovieForm;
