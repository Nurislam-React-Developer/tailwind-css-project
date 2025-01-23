import { createSlice } from '@reduxjs/toolkit';
import { getInfo } from './request';

const initialState = {
	data: [],
	error: null,
	isLoading: false,
};

const rickSlice = createSlice({
  name: 'rick',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default rickSlice.reducer;