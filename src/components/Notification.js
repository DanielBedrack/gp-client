// src/components/Notification.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Notification = ({ show, handleClose, notification }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{notification.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{notification.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Notification;
