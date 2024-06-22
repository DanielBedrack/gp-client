import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TotalHarvestsPage = () => {
  const { cycleId } = useParams();
  const [totalHarvests, setTotalHarvests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { activeCycle } = useSelector((state) => state.cycles);
  console.log(activeCycle);

  // Function to calculate the difference in days between two dates
  const dateDiffInDays = (date1, date2) => {
    console.log(date1);
    console.log(date2);
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  };

  // Function to get the current season based on the month
  const getCurrentSeason = () => {
    const currentMonth = new Date().getMonth() + 1; // Month index starts from 0
    if (currentMonth >= 3 && currentMonth <= 5) {
      return 'Spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return 'Summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      return 'Fall';
    } else {
      return 'Winter';
    }
  };

  useEffect(() => {
    const fetchHarvests = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/tracking/harvests/all-harvests/${cycleId}`
        );
        console.log(response.data.harvests);
        const allHarvestDetails = response.data.harvests.reduce(
          (acc, harvest) => {
            harvest.harvestDetails.forEach((detail) => {
              const existingDetail = acc.find(
                (d) => d.plantName === detail.plantName
              );
              if (existingDetail) {
                existingDetail.quantity += detail.quantity;
                existingDetail.weight += detail.weight;
              } else {
                acc.push({ ...detail });
              }
            });
            return acc;
          },
          []
        );
        setTotalHarvests(allHarvestDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHarvests();
  }, [cycleId]);

  const daysSinceCreation = dateDiffInDays(
    new Date(activeCycle.createdAt),
    new Date()
  );
  const currentSeason = getCurrentSeason();

  return (
    <Container>
      <h3>{currentSeason} Cycle</h3>
      <h3>Age : {daysSinceCreation} days</h3>
      <h3>Total Harvests</h3>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {totalHarvests.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Plant Name</th>
              <th>Quantity</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {totalHarvests.map((harvest, index) => (
              <tr key={index}>
                <td>{harvest.plantName}</td>
                <td>{harvest.quantity}</td>
                <td>{harvest.weight}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default TotalHarvestsPage;
