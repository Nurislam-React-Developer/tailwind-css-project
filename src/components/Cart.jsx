import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
	const { items, isLoading, error } = useSelector((state) => state.cart);

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
								<p className='font-bold'>Товар ID: {item.productId}</p>
								<p>Количество: {item.quantity}</p>
							</div>
							<button className='bg-red-500 text-white px-4 py-2 rounded'>
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
