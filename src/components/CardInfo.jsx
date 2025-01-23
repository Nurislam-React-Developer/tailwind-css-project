import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../store/request';
import { useEffect } from 'react';

const CardInfo = () => {
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector((state) => state.rick);

	useEffect(() => {
		// Only fetch once on mount
		dispatch(getInfo());
	}, []); // Empty dependency array

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!Array.isArray(data)) return <p>No data available</p>;

	return (
		<div className='card-container flex flex-wrap gap-4 p-4 justify-center'>
			{/* Loop through data in the original order */}
			{data.map((item) => (
				<div
					key={item.id}
					className='card flex items-center w-96 border border-sky-400 p-4 gap-4 h-[800px] flex-col rounded-lg shadow-md'
				>
					<div className='card-image'>
						<img
							className='w-full h-full object-cover rounded-t-lg'
							src={item.images[0]} // Use the first image from the array
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
								{item.creationAt.slice(0, 10)}
							</span>
						</div>
						{/* Conditionally render category information if category exists */}
						{item.category && (
							<div className='card-category mt-2 flex items-center text-sm'>
								<span className='mr-2 text-gray-500'>Category:</span>
								<span className='text-gray-700'>{item.category.name}</span>
								<img
									src={item.category.image}
									alt='Category'
									className='w-6 h-6 ml-2 rounded-full' // Style category image
								/>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default CardInfo;
