import { configureStore } from '@reduxjs/toolkit';
import hierarchyReducer from './slices/hierarchySlice';

const store = configureStore({
  reducer: {
    hierarchy: hierarchyReducer,
  },
});

export default store;