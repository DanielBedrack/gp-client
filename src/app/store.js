import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers-redux/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
