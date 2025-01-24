import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getInfoDetails } from '../store/request';
import Spinner from './Spinner';

const CardDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, error, data } = useSelector((state) => state.rick);

	useEffect(() => {
		dispatch(getInfoDetails(id)); // Передаём id в экшен
	}, [dispatch, id]);

	if (isLoading) return <Spinner isLoading={true} />;
	if (error) return <p className='text-red-500'>{error}</p>;
	if (!data)
		return <p className='text-red-500'>К сожалению, товар недоступен</p>;

	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
			<div className='max-w-sm bg-white rounded-lg shadow-md p-6'>
				<h1 className='text-2xl font-bold text-emerald-600 mb-4'>
					{data.title}
				</h1>
				<img
					src={data.image}
					alt={data.title}
					className='w-full h-64 object-contain mb-4 rounded-md'
				/>
				<p className='text-gray-700 text-sm mb-2'>{data.description}</p>
				<p className='text-lg font-semibold text-green-500 mb-4'>
					Цена: ${data.price}
				</p>
				<button
					onClick={() => navigate(-1)}
					className='w-full bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition'
				>
					Назад
				</button>
			</div>
		</div>
	);
};

export default CardDetails;
