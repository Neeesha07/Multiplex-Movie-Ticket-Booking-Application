import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar, Image } from 'react-bootstrap';
import { CheckCircleFill, Film, Building, Calendar3, Clock, PersonFill, Ticket, CurrencyDollar } from 'react-bootstrap-icons';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

const ConfirmationPage = () => {
  const ticket = useSelector((state) => state.ticket.ticket);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadTicket = () => {
    // Implement ticket download logic here
    console.log('Downloading ticket...');
  };

  const handleReturnHome = () => {
    navigate('/');
  };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
//         <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/064f85186996117.65802415ab9e2.gif" alt="Loading..." fluid />
//       </div>
//     );
//  }
const timeStamp = ticket.timeStamp; // e.g., "2024-09-24T08:30:00"
const [date, time] = timeStamp.split('T');
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar bg="black" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Image
              src="/placeholder.svg?height=30&width=30"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="HelioFlix logo"
            />
            <span style={{ color: '#ffffff' }}>HelioFlix</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="flex-grow-1">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <CheckCircleFill size={50} className="text-success mb-3" />
                  <h2 className="text-success">Booking Confirmed!</h2>
                  <p className="lead">Your ticket has been successfully booked.</p>
                </div>

                <Row className="mb-4">
                  <Col md={6} className="text-center">
                  <QRCodeCanvas value={`TICKET-${ticket.ticketId}`} />
                 
                  
                  <p className="mt-2">Scan for quick entry</p>
                  </Col>
                  <Col md={6}>
                    <h4 className="mb-3" style={{ color: '#333' }}>Ticket Details</h4>
                    <p><Ticket className="me-2 text-primary" /><strong>Ticket ID:</strong> {ticket.ticketId}</p>
                    <p><Film className="me-2 text-primary" /><strong>Movie:</strong> {ticket.movieName}</p>
                    <p><Building className="me-2 text-primary" /><strong>Multiplex:</strong> {ticket.multiplexName}</p>
                    <p><Calendar3 className="me-2 text-primary" /><strong>Date:</strong> {date}</p>
                    <p><Clock className="me-2 text-primary" /><strong>Time:</strong> {time.slice(0,5)}</p>
                    <p><PersonFill className="me-2 text-primary" /><strong>Seats:</strong> {ticket.confirmedSeats.join(', ')}</p>
                    <p><CurrencyDollar className="me-2 text-primary" /><strong>Total Paid:</strong> ${ticket.discountedAmount.toFixed(2)}</p>
                  </Col>
                </Row>

                <div className="text-center">
                  {/* <Button variant="primary" onClick={handleDownloadTicket} className="me-3 mb-2">
                    Download Ticket
                  </Button> */}
                  <Button variant="outline-primary" onClick={handleReturnHome} className="mb-2">
                    Return to Home
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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

export default ConfirmationPage;