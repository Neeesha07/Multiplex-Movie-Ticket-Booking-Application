import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddMultiplexForm = ({ ownerId }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        multiplexName: '',
        multiplexLocation: '',
        numberOfScreens: '',
        silver: '',
        gold: '',
        diamond: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    // Open/Close Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Validate Form Logic
    const validateForm = () => {
        const { multiplexName, multiplexLocation, numberOfScreens, silver, gold, diamond } = formData;
        if (multiplexName && multiplexLocation && numberOfScreens && silver && gold && diamond) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        validateForm();
    };

    // Handle form submission
    const handleSubmit = async () => {
        const multiplexData = {
            multiplexName: formData.multiplexName,
            multiplexLocation: formData.multiplexLocation,
            numberOfScreens: formData.numberOfScreens,
            ticketTypePrice: {
                silver: formData.silver,
                gold: formData.gold,
                diamond: formData.diamond
            }
        };

        try {
            await axios.post(`http://win10-2-200:8888/multiplex-ms/addmultiplex/1`, multiplexData);
            alert('Multiplex added successfully!');
            handleClose(); // Close modal after submission
        } catch (error) {
            alert('Error adding multiplex!');
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
                Add Multiplex
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Multiplex</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="multiplexName">
                            <Form.Label>Multiplex Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="multiplexName" 
                                value={formData.multiplexName} 
                                onChange={handleChange} 
                                placeholder="Enter multiplex name" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="multiplexLocation">
                            <Form.Label>Multiplex Location</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="multiplexLocation" 
                                value={formData.multiplexLocation} 
                                onChange={handleChange} 
                                placeholder="Enter multiplex location" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="numberOfScreens">
                            <Form.Label>Number of Screens</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="numberOfScreens" 
                                value={formData.numberOfScreens} 
                                onChange={handleChange} 
                                placeholder="Enter number of screens" 
                            />
                        </Form.Group>

                        <h5 className="text-center">Ticket Type Price</h5>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="silver">
                                    <Form.Label>Silver</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="silver" 
                                        value={formData.silver} 
                                        onChange={handleChange} 
                                        placeholder="Silver price" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="gold">
                                    <Form.Label>Gold</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="gold" 
                                        value={formData.gold} 
                                        onChange={handleChange} 
                                        placeholder="Gold price" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="diamond">
                                    <Form.Label>Diamond</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="diamond" 
                                        value={formData.diamond} 
                                        onChange={handleChange} 
                                        placeholder="Diamond price" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit} 
                        disabled={!isFormValid}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddMultiplexForm;
