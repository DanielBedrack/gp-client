import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const HarvestRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cycleId } = useParams();
  const [harvestDetails, setHarvestDetails] = useState([]);
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCycle = async () => {
      try {
        const { data } = await axios.get(`/tracking/cycles/${cycleId}`);
        console.log('Plant data:', data.plantArr); // Log plant data here
        setPlants(data.plantArr.map((plant) => plant.plantName));
        setHarvestDetails([]); // Reset harvestDetails to an empty array
      } catch (err) {
        console.error('Error fetching cycle:', err);
      }
    };
    fetchCycle();
  }, [cycleId]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedHarvestDetails = [...harvestDetails];
    updatedHarvestDetails[index] = {
      ...updatedHarvestDetails[index],
      [name]: value,
    };
    setHarvestDetails(updatedHarvestDetails);
  };

  const handleAddHarvest = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/tracking/harvests/${cycleId}`, {
        harvestDetails,
      });
      console.log(data.message);
      navigate(`/cycle-details/${cycleId}`);
    } catch (err) {
      console.error('Error adding harvest:', err);
      setError('Error adding harvest');
    }
  };

  const addHarvestField = () => {
    // Filter out already chosen plants
    const availablePlants = plants.filter(
      (plant) => !harvestDetails.map((h) => h.plantName).includes(plant)
    );
    setHarvestDetails([
      ...harvestDetails,
      { plantName: availablePlants[0] || '', quantity: 0, weight: 0 },
    ]);
  };

  return (
    <Container>
      <h3>Register Harvest for Cycle {cycleId}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleAddHarvest}>
        {harvestDetails.map((harvest, index) => (
          <div key={index}>
            <Form.Group controlId={`plantName${index}`}>
              <Form.Label>Plant Name</Form.Label>
              <Form.Control
                as="select"
                name="plantName"
                value={harvest.plantName}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="">Select a plant...</option>
                {plants
                  .filter(
                    (plant) =>
                      !harvestDetails
                        .slice(0, index) // Exclude current harvest details
                        .map((h) => h.plantName)
                        .includes(plant)
                  )
                  .map((plant, i) => (
                    <option key={i} value={plant}>
                      {plant}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`quantity${index}`}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={harvest.quantity}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter quantity"
                min="0"
              />
            </Form.Group>
            <Form.Group controlId={`weight${index}`}>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={harvest.weight}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter weight"
                min="0"
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="primary" type="button" onClick={addHarvestField}>
          Add Harvest Field
        </Button>
        <Button variant="primary" type="submit">
          Register Harvest
        </Button>
      </Form>
    </Container>
  );
};

export default HarvestRegisterPage;
