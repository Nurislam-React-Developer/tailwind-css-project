import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoDetails } from '../store/request';

const Cart = () => {
	const dispatch = useDispatch();
	const { items, isLoading, error, productDetails } = useSelector(
		(state) => state.cart
	);

	useEffect(() => {
		items.forEach((item) => {
			if (productDetails && !productDetails[item.productId]) {
				dispatch(getInfoDetails(item.productId)); // Загружаем информацию для каждого товара
			}
		});
	}, [dispatch, items, productDetails]);

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (error) {
		return <p>Произошла ошибка: {error}</p>;
	}

	return (
		<div className='p-5'>
			<h1 className='text-2xl font-bold mb-5'>Корзина</h1>
			{items.length === 0 ? (
				<p>Корзина пуста</p>
			) : (
				<ul className='space-y-4'>
					{items.map((item) => {
						const product = productDetails && productDetails[item.productId];

						if (!product) {
							return (
								<p key={item.productId}>
									Загружаем товар с ID {item.productId}...
								</p>
							);
						}

						return (
							<li
								key={item.productId}
								className='flex justify-between items-center border-b pb-2'
							>
								<div>
									<p className='font-bold'>Товар ID: {item.productId}</p>
									<p>Количество: {item.quantity}</p>
									<img
										src={product.image} // Показываем картинку товара
										alt={product.title}
										className='w-20 h-20 object-cover'
									/>
									<p>{product.title}</p>
									<p>{product.description}</p>
									<p>Цена: ${product.price}</p>
								</div>
								<button className='bg-red-500 text-white px-4 py-2 rounded'>
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
