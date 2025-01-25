import { configureStore } from '@reduxjs/toolkit';
import rickReducer from './rickSlice';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    [rickReducer.name]: rickReducer.reducer,
    [cartSlice.name]: cartSlice.reducer
  },
});