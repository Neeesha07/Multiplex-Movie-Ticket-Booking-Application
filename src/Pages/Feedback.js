// FeedbacksPage.js
import React, { useEffect, useState } from 'react';
import { Navbar,Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Film } from 'lucide-react';
import './Feedback.css';
const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://win10-2-186:8888/feedback/feedbacks');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar bg="black" variant="dark" expand="lg" className="mb-4">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Film size={30} color="#ffffff" />
            <h3><span style={{ color: '#ffffff' }}>HELIOFLIX</span></h3>
          </Navbar.Brand>
          {/* <h5><span className="text-white">{currentTime}</span></h5> */}
        </Container>
      </Navbar>
    <Container className="mt-4">
      <h1 className="text-center" style={{ color: '#333' }}>Feedbacks</h1>
      <Row className="justify-content-center">
        {feedbacks.map((feedback, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-lg border-0 feedback-card">
              <Card.Body>
                <h5>From {feedback.usertype} </h5>
                <h6><small className="text-muted">subject : {feedback.feedbackTitle}</small></h6>
                <p>{feedback.feedbackBody}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default FeedbacksPage;
