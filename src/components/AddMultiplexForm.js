import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

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
    const [error, setError] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateForm = () => {
        const { multiplexName, multiplexLocation, numberOfScreens, silver, gold, diamond } = formData;
        setIsFormValid(!!(multiplexName && multiplexLocation && numberOfScreens && silver && gold && diamond));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        validateForm();
    };

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
            // await axios.post(`http://win10-2-200:8888/multiplex-ms/addmultiplex/1`, multiplexData);
            handleClose();
            // You might want to add a success message or refresh the multiplex list here
        } catch (error) {
            setError('Error adding multiplex. Please try again.');
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
                <PlusCircle className="me-2" />
                Add Multiplex
            </Button>

            <Modal show={show} onHide={handleClose} centered size="lg" className="bg-dark text-light">
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Add New Multiplex</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-light">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="multiplexName">
                                    <Form.Label className="text-light">Multiplex Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="multiplexName"
                                        value={formData.multiplexName}
                                        onChange={handleChange}
                                        placeholder="Enter multiplex name"
                                        className="shadow-sm bg-dark text-light"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="multiplexLocation">
                                    <Form.Label className="text-light">Multiplex Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="multiplexLocation"
                                        value={formData.multiplexLocation}
                                        onChange={handleChange}
                                        placeholder="Enter multiplex location"
                                        className="shadow-sm bg-dark text-light"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="numberOfScreens">
                            <Form.Label className="text-light">Number of Screens</Form.Label>
                            <Form.Control
                                type="number"
                                name="numberOfScreens"
                                value={formData.numberOfScreens}
                                onChange={handleChange}
                                placeholder="Enter number of screens"
                                className="shadow-sm bg-dark text-light"
                            />
                        </Form.Group>

                        <h5 className="text-center mb-3 text-light">Ticket Type Prices</h5>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="silver">
                                    <Form.Label className="text-light">Silver</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="silver"
                                        value={formData.silver}
                                        onChange={handleChange}
                                        placeholder="Silver price"
                                        className="shadow-sm bg-dark text-light"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="gold">
                                    <Form.Label className="text-light">Gold</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="gold"
                                        value={formData.gold}
                                        onChange={handleChange}
                                        placeholder="Gold price"
                                        className="shadow-sm bg-dark text-light"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="diamond">
                                    <Form.Label className="text-light">Diamond</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="diamond"
                                        value={formData.diamond}
                                        onChange={handleChange}
                                        placeholder="Diamond price"
                                        className="shadow-sm bg-dark text-light"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className="shadow-sm"
                    >
                        Add Multiplex
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddMultiplexForm;
