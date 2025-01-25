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

				// Извлекаем продукты из возвращаемых данных
				const product = action.payload.products[0]; // Предполагается, что добавляется один продукт

				// Проверяем, есть ли товар уже в корзине
				const existingItem = state.items.find(
					(item) => item.productId === product.productId
				);

				if (existingItem) {
					// Если товар есть, увеличиваем его количество
					existingItem.quantity += product.quantity;
				} else {
					// Если товара нет, добавляем новый с количеством = 1
					state.items.push({
						productId: product.productId,
						quantity: product.quantity,
					});
				}
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message; // Записываем сообщение об ошибке
			});
	},
});

export default cartSlice
