import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Edit3, Film, Trash2 } from 'lucide-react';
import DeleteMovieForm from './DeleteMovieForm';

const EditMultiplexForm = () => {
    const [show, setShow] = useState(false);
    const [showDeleteMovie, setShowDeleteMovie] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditMultiplexDetails = () => {
        alert("Edit Multiplex Details clicked!");
        // Implement the logic to edit multiplex details here
    };

    const handleEditMovie = () => {
        alert("Edit Movie clicked!");
        // Implement the logic to edit movie here
    };

    const handleDeleteMovie = () => {
        setShowDeleteMovie(true);
    };

    return (
        <>
            <Button
                variant="dark"
                className="d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '100%', height: '60px', borderRadius: '10px' }}
                onClick={handleShow}
            >
                <Edit3 className="me-2" />
                Edit Multiplex
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Edit Multiplex</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">
                    <div className="d-grid gap-3">
                        <Button 
                            variant="dark" 
                            onClick={handleEditMultiplexDetails}
                            className="d-flex align-items-center justify-content-center py-3 shadow-sm"
                        >
                            <Edit3 className="me-2" />
                            Edit Multiplex Details
                        </Button>
                        <Button 
                            variant="dark" 
                            onClick={handleEditMovie}
                            className="d-flex align-items-center justify-content-center py-3 shadow-sm"
                        >
                            <Film className="me-2" />
                            Edit Movie
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={handleDeleteMovie}
                            className="d-flex align-items-center justify-content-center py-3 shadow-sm"
                        >
                            <Trash2 className="me-2" />
                            Delete Movie
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {showDeleteMovie && (
                <DeleteMovieForm 
                    show={showDeleteMovie} 
                    handleClose={() => setShowDeleteMovie(false)} 
                />
            )}
        </>
    );
};

export default EditMultiplexForm;