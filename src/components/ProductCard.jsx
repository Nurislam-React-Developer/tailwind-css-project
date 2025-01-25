import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/request';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart(product)); // Передаем весь объект продукта в корзину
	};

	return (
		<div className='border p-4 rounded shadow'>
			<h1 className='text-lg font-bold'>{product.title}</h1>
			<p className='text-gray-700'>Цена: ${product.price}</p>
			<img
				src={product.image}
				alt={product.title}
				className='w-full h-40 object-contain my-2'
			/>
			<button
				onClick={handleAddToCart}
				className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
			>
				Добавить в корзину
			</button>
		</div>
	);
};

export default ProductCard;
