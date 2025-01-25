import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from './request';

const initialState = {
	items: [], // Массив товаров в корзине
	isLoading: false, // Состояние загрузки
	error: null, // Состояние ошибки
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.isLoading = true;
				state.error = null; // Сбрасываем ошибку при начале запроса
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.isLoading = false;

				// Проверяем, есть ли товар уже в корзине
				const existingItem = state.items.find(
					(item) => item.id === action.payload.id
				);

				if (existingItem) {
					// Если товар есть, увеличиваем его количество
					existingItem.quantity += 1;
				} else {
					// Если товара нет, добавляем новый с количеством = 1
					state.items.push({ ...action.payload, quantity: 1 });
				}
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message; // Записываем сообщение об ошибке
			});
	},
});

export default cartSlice
