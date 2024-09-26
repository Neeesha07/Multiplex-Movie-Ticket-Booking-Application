import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddMultiplexModal = ({ show, handleClose, handleSubmit }) => {
    const [multiplexName, setMultiplexName] = useState('');
    const [multiplexLocation, setMultiplexLocation] = useState('');
    const [numberOfScreens, setNumberOfScreens] = useState('');
    const [ticketTypePrice, setTicketTypePrice] = useState({
        silver: '',
        gold: '',
        diamond: ''
    });

    const isFormValid = () => {
        return multiplexName && multiplexLocation && numberOfScreens && ticketTypePrice.silver && ticketTypePrice.gold && ticketTypePrice.diamond;
    };

    const onSubmit = () => {
        const data = {
            multiplexName,
            multiplexLocation,
            numberOfScreens: parseInt(numberOfScreens, 10),
            ticketTypePrice: {
                silver: parseInt(ticketTypePrice.silver, 10),
                gold: parseInt(ticketTypePrice.gold, 10),
                diamond: parseInt(ticketTypePrice.diamond, 10),
            },
        };

        handleSubmit(data);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Multiplex</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMultiplexName">
                        <Form.Label>Multiplex Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter multiplex name"
                            value={multiplexName}
                            onChange={(e) => setMultiplexName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMultiplexLocation">
                        <Form.Label>Multiplex Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter multiplex location"
                            value={multiplexLocation}
                            onChange={(e) => setMultiplexLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNumberOfScreens">
                        <Form.Label>Number of Screens</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of screens"
                            value={numberOfScreens}
                            onChange={(e) => setNumberOfScreens(e.target.value)}
                        />
                    </Form.Group>
                    <h5 className="text-center mt-4">Ticket Type Price</h5>
                    <Form.Group controlId="formSilverPrice">
                        <Form.Label>Silver</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter silver ticket price"
                            value={ticketTypePrice.silver}
                            onChange={(e) => setTicketTypePrice({ ...ticketTypePrice, silver: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGoldPrice">
                        <Form.Label>Gold</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter gold ticket price"
                            value={ticketTypePrice.gold}
                            onChange={(e) => setTicketTypePrice({ ...ticketTypePrice, gold: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiamondPrice">
                        <Form.Label>Diamond</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter diamond ticket price"
                            value={ticketTypePrice.diamond}
                            onChange={(e) => setTicketTypePrice({ ...ticketTypePrice, diamond: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit} disabled={!isFormValid()}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddMultiplexModal;
