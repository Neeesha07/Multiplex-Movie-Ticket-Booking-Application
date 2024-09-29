import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Footer(props) {
    return (
        <div>
        <footer className="mt-1 py-4 " style={{ backgroundColor: '#000000' }}>
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
}

export default Footer;