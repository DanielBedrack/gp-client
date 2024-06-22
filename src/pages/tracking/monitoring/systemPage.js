import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSystem } from '../../../reducers-redux/tracking/systemReducer';

const SystemPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { systemId } = useParams();
  const { system } = useSelector((state) => state.system);
  const { activeCycle } = useSelector((state) => state.cycles);
  console.log(activeCycle);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSystem, setEditedSystem] = useState(system);

  useEffect(() => {
    // Initialize editedSystem with current system data when entering edit mode
    setEditedSystem(system);
  }, [system, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await axios.put(`/tracking/systems/${system._id}`, editedSystem);
    dispatch(setSystem(editedSystem));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSystem({
      ...editedSystem,
      [name]: value,
    });
  };
  const handleCycleNavigate = async () => {
    navigate(`/active-cycle/${activeCycle._id}`);
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>System Details</Card.Header>
        <ListGroup variant="flush">
          <SystemDetail
            label="Name"
            value={editedSystem.name}
            name="name"
            isEditing={isEditing}
            onChange={handleChange}
          />
          <SystemDetail
            label="Location"
            value={editedSystem.location}
            name="location"
            isEditing={isEditing}
            onChange={handleChange}
          />
          <SystemDetail
            label="Planting Halls Overall"
            value={editedSystem.plantingHallsOverall}
            name="plantingHallsOverall"
            isEditing={isEditing}
            onChange={handleChange}
          />
          <SystemDetail
            label="Sun Light"
            value={editedSystem.sunLight}
            name="sunLight"
            isEditing={isEditing}
            onChange={handleChange}
          />
          <SystemDetail
            label="Water Tank"
            value={editedSystem.waterTank}
            name="waterTank"
            isEditing={isEditing}
            onChange={handleChange}
          />
        </ListGroup>
        <Button
          variant={isEditing ? 'success' : 'primary'}
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        <Button variant={'success'} onClick={handleCycleNavigate}>
          Active Cycle
        </Button>
      </Card>
    </Container>
  );
};

const SystemDetail = ({ label, value, name, isEditing, onChange }) => {
  return (
    <ListGroupItem>
      <strong>{label}:</strong>{' '}
      {isEditing ? (
        <Form.Control
          type={name === 'name' || name === 'location' ? 'text' : 'number'}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        value
      )}
    </ListGroupItem>
  );
};

export default SystemPage;
