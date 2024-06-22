import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchPlants } from '../../../reducers-redux/data/dataReducer';
import {
  createCycleFailure,
  createCycleSuccess,
} from '../../../reducers-redux/tracking/cycleReducer';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const PlantRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { systemId } = useParams();
  const location = useLocation();
  const plantingHallsOverall = location.state?.plantingHallsOverall || 0;

  const [plants, setPlants] = useState([]);
  const [plantArr, setPlantsArrInput] = useState([]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPlantData = [...plantArr];
    updatedPlantData[index] = { ...updatedPlantData[index], [name]: value };
    setPlantsArrInput(updatedPlantData);
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    const totalQuantity = plantArr.reduce(
      (acc, plant) => acc + Number(plant.quantity),
      0
    );
    if (totalQuantity > plantingHallsOverall) {
      alert(
        `Total quantity of plants cannot exceed the total number of halls (${plantingHallsOverall}).`
      );
      return;
    }

    try {
      const cycleData = {
        isActive: true,
        plantingHallsInUse: totalQuantity,
        plantArr,
      };

      const { data } = await axios.post(
        `/tracking/cycles/${systemId}`,
        cycleData
      );
      dispatch(createCycleSuccess(data.cycle));
      const cycleId = data.cycle._id;
      navigate(`/active-cycle/${cycleId}`);
    } catch (err) {
      dispatch(createCycleFailure(err.message));
      console.log(err.message);
    }
  };

  useEffect(() => {
    dispatch(fetchPlants()).then((response) => {
      setPlants(response.payload);
      console.log(response.payload)
    });
  }, [dispatch]);

  const addPlantField = () => {
    setPlantsArrInput([...plantArr, { plantName: '', quantity: 1 }]);
  };

  const selectedPlants = plantArr.map((plant) => plant.plantName);

  const totalQuantity = plantArr.reduce(
    (acc, plant) => acc + Number(plant.quantity),
    0
  );
  const remainingHalls = plantingHallsOverall - totalQuantity;

  return (
    <Container>
      <h3>Total Halls: {plantingHallsOverall}</h3>
      <h4>Remaining Halls: {remainingHalls}</h4>
      <Form onSubmit={handleAddPlant}>
        {plantArr && plantArr.map((data, index) => (
          <div key={index}>
            <Form.Group controlId={`plantName${index}`}>
              <Form.Control
                as="select"
                name="plantName"
                value={data.plantName}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="">Select a plant...</option>
                {plants.map((plant) => (
                  <option
                    key={plant._id}
                    value={plant.name}
                    disabled={selectedPlants.includes(plant.name)}
                  >
                    {plant.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`quantity${index}`}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={data.quantity}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter quantity"
                min="1"
                max={remainingHalls + Number(data.quantity)}
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="primary" type="button" onClick={addPlantField}>
          Add Plant Field
        </Button>
        <Button variant="primary" type="submit">
          Add Plants
        </Button>
      </Form>
    </Container>
  );
};

export default PlantRegisterPage;
