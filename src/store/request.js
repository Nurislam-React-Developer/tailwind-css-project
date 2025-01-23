import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInfo = createAsyncThunk(
  'request/getInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
				'https://fakestoreapi.com/products'
			);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);