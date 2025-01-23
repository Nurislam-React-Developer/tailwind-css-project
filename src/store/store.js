import { configureStore } from '@reduxjs/toolkit';
import rickReducer from './rickSlice';

export const store = configureStore({
  reducer: {
    rick: rickReducer,
  },
});