// EditMultiplexForm.js
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const EditMultiplexForm = () => {
    const [show, setShow] = useState(false); // Modal visibility

    const handleClose = () => setShow(false); // Close modal
    const handleShow = () => setShow(true); // Open modal

    const handleEditMultiplexDetails = () => {
        // Logic to edit multiplex details
        alert("Edit Multiplex Details clicked!");
    };

    const handleEditMovie = () => {
        // Logic to edit movie
        alert("Edit Movie clicked!");
    };

    const handleDeleteMovie = () => {
        // Logic to delete movie
        alert("Delete Movie clicked!");
    };

    return (
        <>
            <Button
                variant="dark"
                className="mb-3"
                style={{ width: '200px', height: '60px', border: 'none' }}
                onClick={handleShow}
            >
                Edit Multiplex
            </Button>

            {/* Modal for Edit Multiplex */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Multiplex</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={handleEditMultiplexDetails} className="w-100 mb-2">
                        Edit Multiplex Details
                    </Button>
                    <Button variant="primary" onClick={handleEditMovie} className="w-100 mb-2">
                        Edit Movie
                    </Button>
                    <Button variant="danger" onClick={handleDeleteMovie} className="w-100">
                        Delete Movie
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditMultiplexForm;
