import { createSlice } from '@reduxjs/toolkit';
import { getInfo } from './request';

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const rickSlice = createSlice({
  name: 'rick',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default rickSlice.reducer;