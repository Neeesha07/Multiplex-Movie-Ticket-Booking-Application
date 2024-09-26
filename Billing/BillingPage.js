import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setTicket, setDiscounts, clearTicket } from './features/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Navbar, Image } from 'react-bootstrap';
import { CurrencyDollar, Tag, CheckCircleFill, Film, Building, PersonFill } from 'react-bootstrap-icons';

const BillingPage = () => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.ticket.ticket);
  const [discounts, setDiscountList] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const screeningId = 1; // hard-coded for demonstration
  const confirmedSeats = [41, 42, 43]; // hard-coded for demonstration
  const bookerId = 1; // hard-coded booker ID for demonstration

  useEffect(() => {
    const manageTicket = async () => {
      const ticketId = sessionStorage.getItem('ticketId');

      if (ticketId) {
        try {
          await axios.post(`http://localhost:8082/ticketBooker/cancelPayment/${ticketId}`);
          sessionStorage.removeItem('ticketId');
        } catch (error) {
          console.error('Error deleting the current ticket:', error);
        }
      }

      const ticketRequest = {
        screening_id: screeningId,
        booked_seats: confirmedSeats,
      };
      try {
        const response = await axios.post(`http://localhost:8081/multiplex/createNewTicket/${bookerId}`, ticketRequest);
        dispatch(setTicket(response.data));
        sessionStorage.setItem('ticketId', response.data.ticketId);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    manageTicket();
  }, [dispatch]);

  const showDiscounts = async () => {
    if (ticket) {
      try {
        const response = await axios.get(`http://localhost:8082/ticketBooker/getApplicableDiscounts/${ticket.totalAmount}`);
        setDiscountList(response.data);
        dispatch(setDiscounts(response.data));
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    }
  };

  const applyDiscount = async () => {
    if (selectedDiscount !== null && ticket) {
      const discount = discounts[selectedDiscount];

      try {
        const response = await axios.post(`http://localhost:8082/ticketBooker/applyDiscount/${ticket.ticketId}`, {
          discountId: discount.discountId,
        });

        const newDiscountedAmount = response.data;
        dispatch(setTicket({ ...ticket, discountedAmount: newDiscountedAmount }));
       // alert(`Discount applied! Discounted amount: $${newDiscountedAmount.toFixed(2)}`);
      } catch (error) {
        console.error('Error applying discount:', error);
        alert('Failed to apply discount.');
      }
    }
  };

  const handleGoToPayment = async () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/payment');
      setLoading(false);
    }, 3000);
  };

  const handleCancel = async () => {
    if (ticket) {
      try {
        await axios.post(`http://localhost:8082/ticketBooker/cancelPayment/${ticket.ticketId}`);
        sessionStorage.removeItem('ticketId');
        dispatch(clearTicket());
      } catch (error) {
        console.error('Error deleting the ticket on cancel:', error);
      }
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar bg="black" variant="#343a40" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Image
              src="/placeholder.svg?height=30&width=30"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="HelioFlix logo"
            />
            <span style={{ color: '#ffffff' }}><h2>HelioFlix</h2></span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="flex-grow-1">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <Image src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-512.gif" alt="Loading..." fluid />
          </div>
        ) : (
          <>
            <h1 className="text-center mb-4" style={{ color: '#333' }}>Billing Details</h1>
            {ticket && (
              <Card className="shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                <Card.Body className="p-4">
                  <Row>
                    <Col md={6}>
                      <h4 className="mb-4" style={{ color: '#333' }}>Ticket Information</h4>
                      <p><Film className="me-2" style={{ color: '#007bff' }} /><strong>Movie:</strong> {ticket.movieName}</p>
                      <p><Building className="me-2" style={{ color: '#007bff' }} /><strong>Multiplex:</strong> {ticket.multiplexName}</p>
                      <p><PersonFill className="me-2 text-primary" /><strong>Seat Types:</strong> {ticket.seatTypes.join(', ')}</p>
                      <p><strong>Confirmed Seats:</strong> {ticket.confirmedSeats.join(', ')}</p>
                      <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
                    </Col>
                    <Col md={6}>
                      <h4 className="mb-4" style={{ color: '#333' }}>Pricing</h4>
                      <div className="pricing-box p-4 rounded mb-4" style={{ backgroundColor: '#f8f9fa', border: '2px solid #007bff' }}>
                        <p className="mb-3">
                          <CurrencyDollar size={24} className="me-2" style={{ color: '#007bff' }} />
                          <strong>Total Amount:</strong>
                          <span className="float-end h4 mb-0" style={{ color: '#007bff' }}>${ticket.totalAmount ? ticket.totalAmount.toFixed(2) : '0.00'}</span>
                        </p>
                        {ticket.discountedAmount && (
                          <p className="mb-0">
                            <Tag size={24} className="me-2" style={{ color: '#28a745' }} />
                            <strong>Discounted Amount:</strong>
                            <span className="float-end h4 mb-0" style={{ color: '#28a745' }}>${ticket.discountedAmount.toFixed(2)}</span>
                          </p>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline-primary" 
                        onClick={showDiscounts} 
                        className="w-100 mb-3"
                        style={{ transition: 'all 0.3s' }}
                      >
                        Show Available Discounts
                      </Button>

                      {discounts.length > 0 && (
                        <Form.Group className="mb-3">
                          <Form.Label><strong>Select Discount</strong></Form.Label>
                          <Form.Select 
                            onChange={(e) => setSelectedDiscount(e.target.value)} 
                            value={selectedDiscount || ''}
                            className="mb-2"
                          >
                            <option value="">Choose a discount</option>
                            {discounts.map((discount, index) => (
                              <option key={discount.discountId} value={index}>
                                {discount.discountCode} - {discount.discountPercentage}% off
                              </option>
                            ))}
                          </Form.Select>
                          <Button 
                            variant="primary" 
                            onClick={applyDiscount} 
                            className="w-100"
                            disabled={selectedDiscount === null}
                            style={{ transition: 'all 0.3s' }}
                          >
                            <CheckCircleFill className="me-2" />
                            Apply Selected Discount
                          </Button>
                        </Form.Group>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </Container>

      <footer className="mt-4 py-4" style={{ backgroundColor: '#000000' }}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={6} md={4} lg={3}>
              <Button 
                variant="outline-light" 
                onClick={handleCancel} 
                className="w-100 mb-2 mb-md-0 shadow-sm"
                style={{ transition: 'all 0.3s' }}
              >
                Cancel Booking
              </Button>
            </Col>
            <Col xs={6} md={4} lg={3}>
              <Button 
                variant="warning" 
                onClick={handleGoToPayment} 
                className="w-100 shadow-sm"
                style={{ transition: 'all 0.3s' }}
              >
                Proceed to Payment
              </Button>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default BillingPage;