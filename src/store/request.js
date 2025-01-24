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
	async (id, { rejectWithValue }) => {
		try {
			// Проверяем Local Storage
			const savedData = localStorage.getItem(`product-${id}`);
			if (savedData) {
				return JSON.parse(savedData); // Если данные есть, возвращаем их
			}

			// Если данных в Local Storage нет, загружаем их из API
			const { data } = await axios.get(`${BASE_URL_DATEILS}/${id}`);
			localStorage.setItem(`product-${id}`, JSON.stringify(data)); // Сохраняем данные в Local Storage
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
