import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

const Cart = () => {
	const dispatch = useDispatch();
	const { items, isLoading, error, productDetails } = useSelector(
		(state) => state.cart
	);

	if (isLoading) return <p>Загрузка корзины...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div className='p-5'>
			<h1 className='text-2xl font-bold mb-5'>Корзина</h1>
			{items.length === 0 ? (
				<p>Корзина пуста</p>
			) : (
				<ul className='space-y-4'>
					{items.map((item) => {
						const product = productDetails[item.productId];
						return (
							<li
								key={item.productId}
								className='flex items-center border p-4 rounded-lg shadow-md'
							>
								<div className='flex-shrink-0 w-32 h-32 mr-4'>
									{product && (
										<img
											src={product.image}
											alt={product.title}
											className='w-full h-full object-contain'
										/>
									)}
								</div>
								<div className='flex-grow'>
									<h3 className='text-xl font-bold mb-2'>
										{product ? product.title : `Товар ID: ${item.productId}`}
									</h3>
									{product && (
										<>
											<p className='text-gray-600 mb-2'>
												{product.description}
											</p>
											<p className='text-lg font-semibold text-green-600'>
												Цена: ${product.price}
											</p>
										</>
									)}
									<p className='text-gray-500'>Количество: {item.quantity}</p>
								</div>
								<button
									onClick={() => dispatch(removeFromCart(item.productId))}
									className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4'
								>
									Удалить
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Cart;
