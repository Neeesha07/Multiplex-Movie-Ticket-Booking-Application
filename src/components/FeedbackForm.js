// AddFeedback.js
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AddFeedback = () => {
    const [show, setShow] = useState(false); // Modal visibility
    const [feedbackTitle, setFeedbackTitle] = useState(''); // Feedback title
    const [feedbackBody, setFeedbackBody] = useState(''); // Feedback description
    const [isFormValid, setIsFormValid] = useState(false); // Form validation

    const handleClose = () => setShow(false); // Close modal
    const handleShow = () => setShow(true); // Open modal

    // Validate the form when title and description are filled
    const validateForm = () => {
        if (feedbackTitle && feedbackBody.length > 0 && feedbackBody.length <= 300) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    // Handle title input change
    const handleTitleChange = (e) => {
        setFeedbackTitle(e.target.value);
        validateForm();
    };

    // Handle description input change and validate form
    const handleBodyChange = (e) => {
        setFeedbackBody(e.target.value);
        validateForm();
    };

    // Handle form submission
    const handleSubmit = async () => {
        const feedbackData = {
            feedbackTitle,
            feedbackBody
        };

        try {
            // Construct the URL with query parameters
            const url = `http://win10-2-200:8888/multiplex-ms/addfeedback?feedbackTitle=${encodeURIComponent(feedbackData.feedbackTitle)}&feedbackBody=${encodeURIComponent(feedbackData.feedbackBody)}`;
            
            // Send a POST request with query parameters
            await axios.post(url);
            
            alert('Feedback submitted successfully!');
            handleClose(); // Close modal after submission
        } catch (error) {
            alert('Error submitting feedback!');
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
                Add Feedback
            </Button>

            {/* Modal for Add Feedback */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Feedback Title */}
                        <Form.Group className="mb-3" controlId="feedbackTitle">
                            <Form.Label>Feedback Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter feedback title" 
                                value={feedbackTitle} 
                                onChange={handleTitleChange} 
                            />
                        </Form.Group>

                        {/* Feedback Description */}
                        <Form.Group className="mb-3" controlId="feedbackBody">
                            <Form.Label>Feedback Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                maxLength="300" 
                                placeholder="Enter feedback (max 300 characters)" 
                                value={feedbackBody} 
                                onChange={handleBodyChange} 
                            />
                            {/* Character Counter */}
                            <div className="text-muted">
                                {feedbackBody.length}/300
                            </div>
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
                        disabled={!isFormValid} // Enable when form is valid
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddFeedback;
