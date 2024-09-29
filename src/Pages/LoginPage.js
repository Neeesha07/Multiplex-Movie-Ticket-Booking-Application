import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/authSlice';
import { loginUser } from '../features/authAPI';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Film } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(username, password);
      console.log(user);
      const role = user.roles[0].name;
      const userid=user.userId;
      console.log(userid);
      console.log(role);
      dispatch(login(user));
      navigate(
        role=== 'ADMIN'
          ? '/admin/dashboard'
          : role=== 'MOWNER'
          ? `/multiplex-ms/dashboard/${userid}`
          : role=== 'CUST'
          ? `/ticketBooker/dashboard/${userid}`
          : '/multiplex/dashboard'
      );
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 m-0">
        {/* Left side - Black background */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center bg-black text-white p-5">
          <Film size={100} className="mb-4 text-white" />
          <h1 className="display-1 fw-bold mb-4">HELIOFLIX</h1>
          <p className="lead text-center fs-4">Find and book your favourite movies with ease</p>
        </Col>

        {/* Right side - Form section */}
        <Col md={6} className="d-flex align-items-center justify-content-center bg-light">
          <div className="w-75">
            <h2 className="text-center mb-4 text-black">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="py-2"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-2"
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="dark" // Changed to dark (black)
                  type="submit"
                  className="py-2 shadow-sm transition-all"
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Login
                </Button>
                <Button
                  variant="outline-dark" // Changed to outline-dark (black border)
                  onClick={() => navigate('/register')}
                  className="py-2 shadow-sm transition-all"
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Register User
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
