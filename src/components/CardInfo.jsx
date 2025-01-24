import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../store/request';
import { useEffect } from 'react';
import Spinner from './Spinner';

const CardInfo = () => {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useSelector((state) => state.rick);

	useEffect(() => {
		dispatch(getInfo());
	}, [dispatch]);

	if (isLoading) return <Spinner isLoading={true} />;
	if (error) return <p>{error}</p>;
	if (!Array.isArray(data)) return <p>No data available</p>;

	return (
		<div className='card-container flex flex-wrap gap-4 p-4 justify-center'>
			{data.map((item) => (
				<div
					key={item.id}
					className='card flex items-center w-96 border border-sky-400 p-4 gap-4 h-auto flex-col rounded-lg shadow-md'
				>
					<div className='card-image'>
						<img
							className='w-full h-full object-cover rounded-t-lg'
							src={item.image}
							alt={item.title}
						/>
					</div>
					<div className='card-content p-4'>
						<p className='font-mono text-emerald-400 text-lg font-bold'>
							{item.title}
						</p>
						<p className='text-gray-700'>{item.description}</p>
						<div className='flex items-center justify-between mt-4'>
							<p className='text-gray-700'>${item.price}</p>
							<span className='text-gray-500 text-sm'>
								{item.creationAt?.slice(0, 10)}
							</span>
						</div>
						{item.rating && (
							<div className='card-category mt-2 flex items-center text-sm'>
								<span className='mr-2 text-gray-500'>Rating:</span>
								<span className='text-gray-700'>{item.rating.rate}</span>
								<span>{item.rating.count}</span>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default CardInfo;
