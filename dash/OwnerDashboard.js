import React, { useEffect, useState } from 'react';
import { Navbar, Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Film } from 'lucide-react';

const OwnerDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome to the HelioFlix Admin Dashboard!');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReadFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8083/feedbacks/allfeedbacks');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handlePostAnnouncement = async () => {
    if (selectedUserType && announcement) {
      const payload = { userType: selectedUserType, message: announcement };
      try {
        await axios.post('http://localhost:8081/announcement', payload);
        alert('Announcement posted successfully!');
        setAnnouncement('');
        setShowModal(false);
      } catch (error) {
        console.error('Error posting announcement:', error);
        alert('Failed to post announcement.');
      }
    } else {
      alert('Please select a user type and enter an announcement.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar bg="black" variant="dark" expand="lg" className="mb-4">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Film size={30} color="#ffffff" />
            <h3><span style={{ color: '#ffffff' }}>HELIOFLIX</span></h3>
          </Navbar.Brand>
          <h5><span className="text-white">{currentTime}</span></h5>
        </Container>
      </Navbar>

      <Container className="flex-grow-1">
        <h1 className="text-center mt-4" style={{ color: '#333' }}>Admin Dashboard</h1>
        <h2 className="text-center mb-4" style={{ color: '#333' }}>{welcomeMessage}</h2>
        <br></br>
        <br></br>

        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="text-center">
                <Button variant="dark" onClick={handleReadFeedbacks} className="mb-3 w-100" style={{ padding: '15px' }}>
                  Read Feedbacks
                </Button>
                <Button variant="dark" onClick={() => setShowModal(true)} className="w-100" style={{ padding: '15px' }}>
                  Post Announcement
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal for Posting Announcement */}
        <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-dark">
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>Post Announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form>
              <Form.Group controlId="userTypeSelect">
                <Form.Label>Select User Type</Form.Label>
                <Form.Select onChange={(e) => setSelectedUserType(e.target.value)} value={selectedUserType}>
                  <option value="">Choose...</option>
                  <option value="Multiplex Owner">Multiplex Owner</option>
                  <option value="Customer">Customer</option>
                  <option value="Both">Both</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="announcementTextarea">
                <Form.Label>Announcement</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  style={{ backgroundColor: '#343a40', color: '#ffffff' }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="dark" onClick={handlePostAnnouncement}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Feedbacks Display */}
        {feedbacks.length > 0 && (
          <Row className="mt-4">
            <Col md={12}>
              <Card className="shadow-lg border-0">
                <Card.Body>
                  <h4>Feedbacks</h4>
                  {feedbacks.map((feedback, index) => (
                    <div key={index}>
                      <h5>{feedback.feedbackTitle}</h5>
                      <p>{feedback.feedbackBody}</p>
                      <hr />
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <footer className="mt-4 py-4" style={{ backgroundColor: '#000000' }}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <p className="text-white mb-0">&copy; 2024 HelioFlix. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default OwnerDashboard;
