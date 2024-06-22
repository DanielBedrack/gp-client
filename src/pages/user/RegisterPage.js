import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../reducers-redux/tracking/userReducer';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords must match!');
      return;
    }

    try {
      console.log('hello from registerPage');
      // Dispatching the action creator properly
      const { data } = await axios.post('/tracking/users/register', formData);
      console.log(`userDataResponse: ${{data}}`);
      dispatch(userRegister(data));
    } catch (err) {
      // Handle any network or server errors
      toast.error(getError(err));
    }
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage:
          'url("https://modernfarmer.sg/wp-content/uploads/2020/06/greenhouse-1920x1080-1.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <h1 className="text-center mb-4" style={{ color: 'black' }}>
          Welcome to GrowPonic
        </h1>
      </Container>
      <Container
        style={{
          position: 'absolute',
          top: '40%', // Move the container higher
          left: '50%', // Center horizontally
          transform: 'translate(-50%, -50%)', // Center horizontally and vertically
          padding: '40px', // Increased padding
          maxWidth: '600px', // Increased maximum width
          backgroundColor: 'rgba(0, 100, 0, 0.8)', // Dark green with opacity
          backdropFilter: 'blur(5px)', // Add blur effect
          borderRadius: '10px', // Rounded corners
          color: 'white', // White font color
        }}
      >
        <h2 className="mb-4 text-center">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <div className="mb-3 d-grid">
            <Button type="submit" variant="primary" className="primary">
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterPage;
