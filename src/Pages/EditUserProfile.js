// import React, { useState, useEffect, useCallback } from 'react';
// import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTicketBooker } from '../features/ticketBookerSlice';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const EditUserProfile = () => {
// //   const [userData, setUserData] = useState({
    
// //   });
// const dispatch = useDispatch();
// const { ticketBooker, loading: ticketBookerLoading } = useSelector((state) => state.ticketBooker);

//   const [isEditing, setIsEditing] = useState(false);

// //   const fetchUserData = useCallback(async () => {
// //     try {
// //       const response = await fetch('http://localhost:8082/ticketBooker/getbookerbyid/1');
// //       const data = await response.json();
// //       setUserData(data);
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchUserData();
// //   }, [fetchUserData]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserData(prevData => ({
// //       ...prevData,
// //       [name]: value
// //     }));
// //   };

// const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setTicketBooker({
//       ...ticketBooker,
//       [name]: value
//     }));
//   };
  
//   const handleUpdate = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       await fetch(`http://win10-2-186:8888/ticketBooker/updatebooker/${ticketBooker.bookerId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(ticketBooker),
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error saving user data:', error);
//     }
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="bg-dark vh-100 d-flex align-items-center justify-content-center">
    
//     <Container>
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
//             <Card.Header as="h2" className="text-center text-primary">Edit User Profile</Card.Header>
//             <Card.Body>
//               <Form>
//                 <Form.Group className="mb-3" controlId="formName">
//                   <Form.Label className="text-dark">Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="bookerName"
//                     value={ticketBooker.bookerName || ''}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     style={{ opacity: isEditing ? 1 : 0.5 }} // Adjust opacity based on editing state
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label className="text-dark">Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="bookerMail"
//                     value={ticketBooker.bookerMail || ''}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     style={{ opacity: isEditing ? 1 : 0.5 }}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formContact">
//                   <Form.Label className="text-dark">Contact</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="bookerContact"
//                     value={ticketBooker.bookerContact || ''}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     style={{ opacity: isEditing ? 1 : 0.5 }}
//                   />
//                 </Form.Group>
//               </Form>
//             </Card.Body>
//             <Card.Footer className="text-end">
//               <Button variant="primary" onClick={handleUpdate} disabled={isEditing} className="me-2">
//                 Update
//               </Button>
//               <Button variant="success" onClick={handleSave} disabled={!isEditing}>
//                 Save
//               </Button>
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
    
//   </div>
//   <Footer/>
//   </>
//   );
// };

// export default EditUserProfile;

import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTicketBooker } from '../features/ticketBookerSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const { ticketBooker } = useSelector((state) => state.ticketBooker);
  const [isEditing, setIsEditing] = useState(false);

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
      </div>
      
    </>
  );
};

export default EditUserProfile;
