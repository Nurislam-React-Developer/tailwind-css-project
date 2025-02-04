import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';
const CART_URL = `${BASE_URL}/carts`;

export const getInfo = createAsyncThunk(
	'request/getInfo',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${BASE_URL}/products`);
			return data;
		} catch (error) {
			// Возвращаем более понятное сообщение об ошибке
			return rejectWithValue(error.response?.data || 'Ошибка загрузки данных');
		}
	}
);

export const getInfoDetails = createAsyncThunk(
	'request/getInfoDetails',
	async (id, { rejectWithValue }) => {
		try {
			// Проверяем Local Storage
			const cachedData = localStorage.getItem(`product-${id}`);
			if (cachedData) {
				try {
					// Пытаемся распарсить данные
					return JSON.parse(cachedData);
				} catch {
					// Удаляем некорректные данные из Local Storage
					localStorage.removeItem(`product-${id}`);
				}
			}
			// Загружаем данные из API, если в Local Storage ничего нет
			const { data } = await axios.get(`${BASE_URL}/products/${id}`);
			localStorage.setItem(`product-${id}`, JSON.stringify(data)); // Кешируем данные
			return data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Ошибка загрузки деталей');
		}
	}
);

export const addToCart = createAsyncThunk(
	'request/addToCart',
	async (product, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(CART_URL, {
				userId: Math.floor(Math.random() * 1000), // Генерация случайного userId
				date: new Date().toISOString(), // Текущая дата
				products: [
					{
						productId: product.id,
						quantity: 1, // Начальное количество товара
					},
				],
			});
			console.log('Ответ от сервера:', data); // Лог ответа от сервера
			return data;
		} catch (error) {
			console.error('Ошибка запроса:', error); // Лог ошибки
			return rejectWithValue(
				error.response?.data || 'Ошибка добавления в корзину'
			);
		}
	}
);

export const deleteFromCart = createAsyncThunk(
	'cart/deleteFromCart',
	async ({ productId, quantity }, { rejectWithValue }) => {
		try {
			if (quantity > 1) {
				return { productId, quantity: quantity - 1 }; // Уменьшаем количество
			} else {
				await axios.delete(`${CART_URL}/${productId}`); // Удаляем товар с сервера
				return { productId, quantity: 0 };
			}
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Ошибка удаления из корзины'
			);
		}
	}
);


