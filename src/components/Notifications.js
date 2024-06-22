// src/components/NotificationList.js
import React from 'react';
import { useSelector } from 'react-redux';
import NotificationManager from '../notificationManager';

const NotificationList = () => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <>
      <NotificationManager />
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </>
  );
};

export default NotificationList;
