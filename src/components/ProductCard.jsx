import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/request';


const ProductCard = ({ product }) => {

	const dispatch = useDispatch();
const handleAddToCart = async () => {
	try {
		await dispatch(addToCart(product));
	} catch (error) {
		console.error('Ошибка добавления в корзину:', error);
	}
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
