import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getInfo, getInfoDetails } from '../store/request'; // Импортируем экшен для корзины
import { useEffect } from 'react';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const CardInfo = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { data, isLoading, error } = useSelector((state) => state.rick);

	useEffect(() => {
		dispatch(getInfo());
	}, [dispatch]);

	if (isLoading) return <Spinner isLoading={true} />;
	if (error) return <p className='text-red-500'>{error}</p>;
	if (!Array.isArray(data)) return <p>No data available</p>;

	const handleAddToCart = async (product) => {
		await dispatch(addToCart(product));
		await dispatch(getInfoDetails(product.id));
		navigate('/cart');
	};


	return (
		<div className='card-container flex flex-wrap gap-6 p-4 justify-center'>
			{data.map((item) => (
				<div
					key={item.id}
					className='card transform transition-transform duration-300 hover:scale-105 flex flex-col w-80 border border-sky-400 p-4 gap-4 h-auto flex-col rounded-lg shadow-md hover:shadow-lg'
				>
					<div className='card-image'>
						<img
							className='w-full h-48 object-cover rounded-lg'
							src={item.image}
							alt={item.title}
						/>
					</div>
					<div className='card-content p-4 flex-1'>
						<p className='font-mono text-emerald-500 text-lg font-bold'>
							{item.title}
						</p>
						<p className='text-gray-700'>{item.description}</p>
						<div className='flex items-center justify-between mt-4'>
							<p className='text-green-700 text-lg'>${item.price}</p>
							<span className='text-gray-500 text-sm'>
								{item.creationAt?.slice(0, 10)}
							</span>
						</div>
						{item.rating && (
							<div className='card-category mt-2 flex items-center text-sm'>
								<span className='mr-2 text-gray-500'>Rating:</span>
								<span className='text-gray-700'>{item.rating.rate}</span>
								<span className='text-gray-500'>({item.rating.count})</span>
							</div>
						)}
					</div>
					<div className='flex gap-4'>
						<button
							onClick={() => navigate(`/details/${item.id}`)}
							className='bg-emerald-500 text-white font-bold py-2 rounded hover:bg-emerald-600 transition duration-300 flex-1'
						>
							More Info
						</button>
						<button
							onClick={() => handleAddToCart(item)}
							className='bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300 flex-1'
						>
							Add to Cart
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default CardInfo;
