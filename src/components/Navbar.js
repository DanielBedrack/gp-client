import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLoggedOut } from '../reducers-redux/tracking/userReducer';
import Notification from './Notification';

const MyNavbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notifications);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setSelectedNotification(null);
  };

  const signoutHandler = () => {
    dispatch(userLoggedOut());
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {!isHomePage && (
              <span style={{ color: 'white', marginLeft: '1rem' }}>Home</span>
            )}
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/data">
            Data
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/system">
            System
          </Navbar.Brand>
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <>
                  Notifications{' '}
                  <Badge pill bg="danger">
                    {notifications.length}
                  </Badge>
                </>
              }
              id="notification-nav-dropdown"
            >
              {notifications.map((notification, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {notification.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="My System" id="my-system-nav-dropdown">
              <NavDropdown.Item as={Link} to="/active-cycle/:cycleId">
                Cycle Page
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/system/:systemId">
                System Page
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/total-harvests/:cycleId">
                Total Harvests Page
              </NavDropdown.Item>
            </NavDropdown>
            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="user-nav-dropdown"
                style={{ color: 'white' }}
              >
                <NavDropdown.Item href="/profile">
                  User Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/orderhistory">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signoutHandler}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link className="nav-link text-white" to="/register">
                Sign In
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {selectedNotification && (
        <Notification
          show={showNotification}
          handleClose={handleCloseNotification}
          notification={selectedNotification}
        />
      )}
    </>
  );
};

export default MyNavbar;
