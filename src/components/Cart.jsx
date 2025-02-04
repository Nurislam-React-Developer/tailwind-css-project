import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../store/request';

const Cart = () => {
	const dispatch = useDispatch();
	const { items, isLoading, error, productDetails } = useSelector(
		(state) => state.cart
	);

	if (isLoading)
		return <p className='text-center text-xl p-8'>Загрузка корзины...</p>;
	if (error)
		return <p className='text-red-500 text-center p-8'>Ошибка: {error}</p>;

	return (
		<div className='max-w-6xl mx-auto p-6 bg-gray-50'>
			<h1 className='text-3xl font-bold mb-8 text-gray-800 border-b pb-4'>
				Корзина
			</h1>
			{items.length === 0 ? (
				<p className='text-center text-gray-500 text-xl p-8'>Корзина пуста</p>
			) : (
				<ul className='space-y-6'>
					{items.map((item) => {
						const product = productDetails[item.productId];
						return (
							<li
								key={item.productId}
								className='flex items-center bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'
							>
								<div className='flex-shrink-0 w-40 h-40 mr-6 bg-gray-50 rounded-lg p-2'>
									{product && (
										<img
											src={product.image}
											alt={product.title}
											className='w-full h-full object-contain rounded-lg'
										/>
									)}
								</div>
								<div className='flex-grow'>
									<h3 className='text-xl font-bold mb-3 text-gray-800'>
										{product ? product.title : `Товар ID: ${item.productId}`}
									</h3>
									{product && (
										<div className='space-y-3'>
											<p className='text-gray-600 line-clamp-2'>
												{product.description}
											</p>
											<div className='flex items-center justify-between'>
												<p className='text-xl font-semibold text-green-600'>
													${product.price}
												</p>
												<div className='flex items-center space-x-4'>
													<p className='text-gray-600'>
														Количество:{' '}
														<span className='font-medium'>{item.quantity}</span>
													</p>
													<button
														onClick={() =>
															dispatch(
																deleteFromCart({
																	productId: item.productId,
																	quantity: item.quantity,
																})
															)
														}
														className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center'
													>
														Удалить 1 шт.
													</button>
												</div>
											</div>
										</div>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Cart;
