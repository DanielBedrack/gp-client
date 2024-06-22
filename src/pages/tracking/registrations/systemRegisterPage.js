import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createSystem } from '../../../reducers-redux/tracking/systemReducer';

const SystemRegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [systemData, setSystemData] = useState({
    name: '',
    location: '',
    plantingHallsOverall: '',
    sunLight: '',
    waterTank: '',
    images: [],
    userID: userInfo._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSystemData({
      ...systemData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSystemData({
      ...systemData,
      images: Array.from(e.target.files),
    });
  };

  const handleAddValues = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        '/tracking/systems/create-system',
        systemData,
      );
      dispatch(createSystem(data.newSystem));
      navigate(`/create-cycle/${data.newSystem._id}`, {
        state: { plantingHallsOverall: systemData.plantingHallsOverall },
      });
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleAddValues}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={systemData.name}
            onChange={handleChange}
            placeholder="Enter system name"
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={systemData.location}
            onChange={handleChange}
            placeholder="Enter system location"
          />
        </Form.Group>

        <Form.Group controlId="plantingHallsOverall">
          <Form.Label>Planting Halls Overall</Form.Label>
          <Form.Control
            type="number"
            name="plantingHallsOverall"
            value={systemData.plantingHallsOverall}
            onChange={handleChange}
            placeholder="Enter planting halls overall"
          />
        </Form.Group>

        <Form.Group controlId="sunLight">
          <Form.Label>Sun Light</Form.Label>
          <Form.Control
            type="number"
            name="sunLight"
            value={systemData.sunLight}
            onChange={handleChange}
            placeholder="Enter sun light"
          />
        </Form.Group>

        <Form.Group controlId="waterTank">
          <Form.Label>Water Tank</Form.Label>
          <Form.Control
            type="number"
            name="waterTank"
            value={systemData.waterTank}
            onChange={handleChange}
            placeholder="Enter water tank"
          />
        </Form.Group>

        <Form.Group controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Values
        </Button>
      </Form>
    </Container>
  );
};

export default SystemRegistrationPage;
