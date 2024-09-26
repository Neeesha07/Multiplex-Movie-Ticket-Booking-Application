import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { MessageSquarePlus } from 'lucide-react';

const AddFeedback = () => {
    const [show, setShow] = useState(false);
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackBody, setFeedbackBody] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateForm = () => {
        setIsFormValid(feedbackTitle && feedbackBody.length > 0 && feedbackBody.length <= 300);
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
        try {
            const url = `http://win10-2-200:8888/multiplex-ms/addfeedback?feedbackTitle=${encodeURIComponent(feedbackTitle)}&feedbackBody=${encodeURIComponent(feedbackBody)}`;
            await axios.post(url);
            handleClose();
            // You might want to add a success message or refresh the feedback list here
        } catch (error) {
            setError('Error submitting feedback. Please try again.');
            console.error(error);
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
                <MessageSquarePlus className="me-2" />
                Add Feedback
            </Button>

            <Modal show={show} onHide={handleClose} centered className="bg-dark text-light">
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Add Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-light">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group className="mb-3" controlId="feedbackTitle">
                            <Form.Label className="text-light">Feedback Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter feedback title" 
                                value={feedbackTitle} 
                                onChange={handleTitleChange} 
                                className="shadow-sm bg-dark text-light"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="feedbackBody">
                            <Form.Label className="text-light">Feedback Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                maxLength="300" 
                                placeholder="Enter feedback (max 300 characters)" 
                                value={feedbackBody} 
                                onChange={handleBodyChange} 
                                className="shadow-sm bg-dark text-light"
                            />
                            <Form.Text className="text-muted d-flex justify-content-between">
                                <span>Max 300 characters</span>
                                <span>{feedbackBody.length}/300</span>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        variant="dark" 
                        onClick={handleSubmit} 
                        disabled={!isFormValid}
                        className="shadow-sm"
                    >
                        Submit Feedback
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddFeedback;
