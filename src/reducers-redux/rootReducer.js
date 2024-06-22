import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './tracking/userReducer';
import systemReducer from './tracking/systemReducer';
import cycleReducer from './tracking/cycleReducer';
import dataReducer from './data/dataReducer';
import notificationReducer from './notification/notificationReducer';

const rootReducer = combineReducers({
  user: userReducer,
  system: systemReducer,
  cycles: cycleReducer,
  data: dataReducer,
  notifications: notificationReducer,
});

export default rootReducer;
