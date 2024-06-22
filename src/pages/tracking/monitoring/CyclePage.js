import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert,
  Button,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CyclePage = () => {
  const { cycleId } = useParams();
  const navigate = useNavigate();
  const system = useSelector((state) => state.system.system);
  const plantingHallsOverall = system ? system.plantingHallsOverall : 0;
  const [cycle, setCycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCycle = async () => {
      try {
        const { data } = await axios.get(`/tracking/cycles/${cycleId}`);
        setCycle(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching cycle data');
        setLoading(false);
      }
    };

    fetchCycle();
  }, [cycleId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const handleNavigate = () => {
    navigate(`/harvest-register/${cycleId}`);
  };
    const handleTotalNavigate = () => {
      navigate(`/total-harvests/${cycleId}`);
    };

  return (
    <Container className="mt-5">
      {cycle && cycle.isActive ? (
        <Card>
          <Card.Header>Cycle Details</Card.Header>
          <ListGroup variant="flush">
            <ListGroupItem>
              <strong>Created At:</strong>{' '}
              {new Date(cycle.createdAt).toLocaleString()}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Updated At:</strong>{' '}
              {new Date(cycle.updatedAt).toLocaleString()}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Planting Halls In Use:</strong> {cycle.plantingHallsInUse}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Plant Array:</strong>
              <ul>
                {cycle.plantArr.map((plant) => (
                  <li key={plant._id}>
                    {plant.plantName} - Quantity: {plant.quantity}
                  </li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>
              <strong>Planting Halls Overall:</strong> {plantingHallsOverall}
            </ListGroupItem>
          </ListGroup>
          <Card.Footer>
            <Button variant="primary" onClick={handleNavigate}>
              Go to Harvest Register
            </Button>
            <Button variant="success" onClick={handleTotalNavigate}>
              Go to total Harvest
            </Button>
          </Card.Footer>
        </Card>
      ) : (
        <Alert variant="warning">This cycle is not active.</Alert>
      )}
    </Container>
  );
};

export default CyclePage;
