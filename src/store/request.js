import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';
const BASE_URL_DATEILS = 'https://fakestoreapi.com/products';

export const getInfo = createAsyncThunk(
	'request/getInfo',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${BASE_URL}/products`);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getInfoDetails = createAsyncThunk(
	'request/getInfoDetails',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${BASE_URL_DATEILS}`);
			return data;
		} catch (error) {
      return rejectWithValue(error)
    }
	}
);
