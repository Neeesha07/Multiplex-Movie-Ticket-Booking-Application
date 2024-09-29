// AddFeedback.js
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AddFeedback = ({ show, handleClose }) => { // Accept show and handleClose as props
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackBody, setFeedbackBody] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        if (feedbackTitle && feedbackBody.length > 0 && feedbackBody.length <= 300) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleTitleChange = (e) => {
        setFeedbackTitle(e.target.value);
        validateForm();
    };

    const handleBodyChange = (e) => {
        setFeedbackBody(e.target.value);
        validateForm();
    };

    const handleSubmit = async () => {
        const feedbackData = {
            feedbackTitle,
            feedbackBody,
            usertype:"Customer"
        };

        try {
            // Send the feedback data to your backend
            const response = await axios.post('http://win10-2-186:8888/feedback/addFeedback', feedbackData);
            alert(response.data); // Alert the response from the server
            handleClose(); // Close modal after submission
            // Optionally reset form fields
            setFeedbackTitle('');
            setFeedbackBody('');
        } catch (error) {
            alert('Error submitting feedback!');
            console.error(error);
        }
    };
    

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="feedbackTitle">
                        <Form.Label>Feedback Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter feedback title" 
                            value={feedbackTitle} 
                            onChange={handleTitleChange} 
                        />
                    </Form.Group>
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
                        <div className="text-muted">{feedbackBody.length}/300</div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddFeedback;
