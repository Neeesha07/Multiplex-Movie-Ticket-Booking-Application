import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Navbar, Image } from 'react-bootstrap';
import { CreditCard, ShieldLock, ClockHistory, Film } from 'react-bootstrap-icons';
import Footer from '../components/Footer';

const PaymentPage = () => {
  const ticket = useSelector((state) => state.ticket.ticket);
  const navigate = useNavigate();
  
  const [upiId, setUpiId] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSessionExpired(true);
          alert('Session is terminated.');
          handleCancelPayment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleConfirmPayment = async () => {
    if (!upiId.endsWith('@upi')) {
      alert('Invalid UPI ID. It must end with @upi.');
      return;
    }
    
    if (inputCaptcha !== captcha) {
      alert('Payment failed due to incorrect captcha.');
      await cancelPayment();
      return;
    }

    setLoading(true);

    try {
      await axios.post(`http://win10-2-186:8888/ticketBooker/confirmPayment/${ticket.ticketId}`, {
        upiId: upiId,
        captcha: inputCaptcha,
      });
      setTimeout(() => {
        navigate('/confirmation');
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      await cancelPayment();
      setLoading(false);
    }
  };

  const cancelPayment = async () => {
    if (ticket) {
      try {
        await axios.post(`http://win10-2-186:8888/ticketBooker/cancelPayment/${ticket.ticketId}`);
      } catch (error) {
        console.error('Error cancelling payment:', error);
      }
    }
    navigate('/');
  };

  const handleRegenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInputCaptcha('');
  };

  const handleCancelPayment = () => {
    cancelPayment();
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar bg="black" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
          <Film size={30}/>
            <span style={{ color: '#ffffff' }}>HelioFlix</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="flex-grow-1">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/064f85186996117.65802415ab9e2.gif" alt="Loading..." fluid />
          </div>
        ) : sessionExpired ? (
          <Card className="text-center p-5 shadow-lg">
            <Card.Body>
              <Card.Title as="h2">Session Expired</Card.Title>
              <Card.Text>Your session has expired. Please return to the billing page.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/billing')}>Return to Billing</Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            <h1 className="text-center mb-4" style={{ color: '#333' }}>Payment Page</h1>
            {ticket ? (
              <Card className="shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                <Card.Body className="p-4">
                  <Row>
                    <Col md={6}>
                      <h4 className="mb-4" style={{ color: '#333' }}>Ticket Details</h4>
                      <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
                      <p><strong>Total Amount:</strong> ${ticket.discountedAmount.toFixed(2)}</p>
                      <p><strong>Confirmed Seats:</strong> {ticket.confirmedSeats.join(', ')}</p>
                      <p><strong>Status:</strong> {ticket.ticketstatus}</p>
                      <div className="d-flex align-items-center mb-3">
                        <ClockHistory className="me-2" style={{ color: '#007bff' }} />
                        <h5 className="mb-0">Session Timer: {formatTime(timer)}</h5>
                      </div>
                    </Col>
                    <Col md={6}>
                      <h4 className="mb-4" style={{ color: '#333' }}>Payment Information</h4>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label><CreditCard className="me-2" />UPI ID</Form.Label>
                          <Form.Control
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter your UPI ID"
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label><ShieldLock className="me-2" />Captcha: {captcha}</Form.Label>
                          <Form.Control
                            type="text"
                            value={inputCaptcha}
                            onChange={(e) => setInputCaptcha(e.target.value)}
                            placeholder="Enter the captcha"
                            required
                          />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleRegenerateCaptcha} className="me-2 mb-2">
                          Regenerate Captcha
                        </Button>
                        <Button variant="primary" onClick={handleConfirmPayment} className="me-2 mb-2">
                          Confirm Payment
                        </Button>
                        <Button variant="danger" onClick={handleCancelPayment} className="mb-2">
                          Cancel Payment
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ) : (
              <Card className="text-center p-5 shadow-lg">
                <Card.Body>
                  <Card.Title as="h2">No Ticket Information</Card.Title>
                  <Card.Text>No ticket information is available.</Card.Text>
                  <Button variant="primary" onClick={() => navigate('/billing')}>Return to Billing</Button>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </Container>

      <Footer/>
    </div>
  );
};

export default PaymentPage;