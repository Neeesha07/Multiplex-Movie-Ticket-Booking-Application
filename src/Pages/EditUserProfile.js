
import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTicketBooker } from '../features/ticketBookerSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const { ticketBooker } = useSelector((state) => state.ticketBooker);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTicketBooker({
      ...ticketBooker,
      [name]: value
    }));
  };
  
  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await fetch(`http://win10-2-186:8888/ticketBooker/updatebooker/${ticketBooker.bookerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketBooker),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };
  const handleReturnHome = () => {
    navigate('/ticketBooker/dashboard');
  };

  return (
    <>
      
      <div className="bg-dark min-vh-100 py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
            <Card className="shadow border-0 bg-white bg-opacity-75" style={{ backdropFilter: 'blur(10px)' }}>
  <Card.Header className="bg-primary bg-opacity-75 text-white text-center py-4">
    <h2 className="mb-0">
      <i className="bi bi-person-circle me-2"></i>
      Edit User Profile
    </h2>
  </Card.Header>
  <Card.Body className="p-4">
    <Form>
      <Form.Group className="mb-4" controlId="formName">
        <Form.Label className="text-muted">
          <i className="bi bi-person me-2"></i>
          Name
        </Form.Label>
        <Form.Control
          type="text"
          name="bookerName"
          value={ticketBooker.bookerName || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`bg-white bg-opacity-75 ${isEditing ? 'border-primary' : ''}`}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Label className="text-muted">
          <i className="bi bi-envelope me-2"></i>
          Email
        </Form.Label>
        <Form.Control
          type="email"
          name="bookerMail"
          value={ticketBooker.bookerMail || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`bg-white bg-opacity-75 ${isEditing ? 'border-primary' : ''}`}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formContact">
        <Form.Label className="text-muted">
          <i className="bi bi-telephone me-2"></i>
          Contact
        </Form.Label>
        <Form.Control
          type="text"
          name="bookerContact"
          value={ticketBooker.bookerContact || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`bg-white bg-opacity-75 ${isEditing ? 'border-primary' : ''}`}
        />
      </Form.Group>
    </Form>
  </Card.Body>
  <Card.Footer className="bg-light bg-opacity-75 text-end py-3">
    <Button 
      variant={isEditing ? "outline-primary" : "primary"} 
      onClick={handleUpdate} 
      disabled={isEditing} 
      className="me-2"
    >
      <i className="bi bi-pencil me-2"></i>
      Update
    </Button>
    <Button 
      variant={isEditing ? "success" : "outline-success"} 
      onClick={handleSave} 
      disabled={!isEditing}
    >
      <i className="bi bi-check-lg me-2"></i>
      Save
    </Button>
  </Card.Footer>
</Card>
            </Col>
          </Row>
        </Container>
        <div className="text-center mt-5">
                  {/* <Button variant="primary" onClick={handleDownloadTicket} className="me-3 mb-2">
                    Download Ticket
                  </Button> */}
                  <Button variant="outline-primary" onClick={handleReturnHome} className="bg-light bg-gradient text-primary mb-2">
                    Return to Home
                  </Button>
                </div>
      </div>
      
    </>
  );
};

export default EditUserProfile;
