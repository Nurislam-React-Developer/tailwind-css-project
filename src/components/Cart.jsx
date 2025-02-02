import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

const Cart = () => {
	const dispatch = useDispatch();
	const { items, isLoading, error, productDetails } = useSelector(
		(state) => state.cart
	);

	const handleRemove = (productId) => {
		dispatch(removeFromCart(productId));
	};

	if (isLoading) return <p>Загрузка корзины...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div className='p-5'>
			<h1 className='text-2xl font-bold mb-5'>Корзина</h1>
			{items.length === 0 ? (
				<p>Корзина пуста</p>
			) : (
				<ul className='space-y-4'>
					{items.map((item) => (
						<li
							key={item.productId}
							className='flex justify-between items-center border-b pb-2'
						>
							<div>
								<p className='font-bold'>
									{productDetails[item.productId]?.title ||
										`Товар ID: ${item.productId}`}
								</p>
								<p>Количество: {item.quantity}</p>
								{productDetails[item.productId] && (
									<p>Цена: ${productDetails[item.productId].price}</p>
								)}
							</div>
							<button
								onClick={() => handleRemove(item.productId)}
								className='bg-red-500 text-white px-4 py-2 rounded'
							>
								Удалить
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Cart;