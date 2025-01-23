import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInfo = createAsyncThunk(
  'request/getInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
				'https://api.escuelajs.co/api/v1/products'
			);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);