import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/user/RegisterPage';
import MyNavbar from './components/Navbar';
import SystemRegistrationPage from './pages/tracking/registrations/systemRegisterPage';
import PlantRegisterPage from './pages/tracking/registrations/plantRegisterPage';
import ActiveCyclePage from './pages/tracking/monitoring/CyclePage';
import SystemPage from './pages/tracking/monitoring/systemPage';
import HarvestRegisterPage from './pages/tracking/registrations/harvestRegistration';
import TotalHarvestsPage from './pages/tracking/monitoring/TotalHarvestsPage';
import NotificationList from './components/Notifications';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<NotificationList />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-system" element={<SystemRegistrationPage />} />
          <Route
            path="/create-cycle/:systemId"
            element={<PlantRegisterPage />}
          />
          <Route
            path="/harvest-register/:cycleId"
            element={<HarvestRegisterPage />}
          />
          <Route path="/system" element={<SystemPage />} />
          <Route path="/active-cycle/:cycleId" element={<ActiveCyclePage />} />
          <Route
            path="/total-harvests/:cycleId"
            element={<TotalHarvestsPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
