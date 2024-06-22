import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { addNotification } from './reducers-redux/notification/notificationReducer';

const NotificationManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:5050');

    socket.on('connect', () => {
      console.log('Connected to Gateway');
    });

    socket.on('notification', (notification) => {
      console.log('Received notification:', notification);
      dispatch(addNotification(notification));
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Gateway');
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return null;
};

export default NotificationManager;
