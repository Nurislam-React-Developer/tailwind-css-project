import { createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteFromCart, getInfoDetails } from './request';

const initialState = {
	items: [], // Товары в корзине
	isLoading: false, // Состояние загрузки
	error: null, // Ошибки
	productDetails: {}, // Детали товаров
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.isLoading = false;
				const product = action.payload.products[0];
				const existingItem = state.items.find(
					(item) => item.productId === product.productId
				);
				if (existingItem) {
					existingItem.quantity += product.quantity;
				} else {
					state.items.push({
						productId: product.productId,
						quantity: product.quantity,
					});
				}
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getInfoDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInfoDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productDetails[action.payload.id] = action.payload;
			})
			.addCase(getInfoDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(deleteFromCart.fulfilled, (state, action) => {
				const { productId, quantity } = action.payload;
				const existingItem = state.items.find(
					(item) => item.productId === productId
				);

				if (existingItem) {
					if (quantity > 0) {
						existingItem.quantity = quantity; // Просто уменьшаем количество
					} else {
						state.items = state.items.filter(
							(item) => item.productId !== productId
						); // Удаляем товар
					}
				}
			});

	},
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice;
