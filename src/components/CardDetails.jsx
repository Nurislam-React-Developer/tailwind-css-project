import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Импорт useParams
import { getInfoDetails } from '../store/request';
import Spinner from './Spinner';

const CardDetails = () => {
	const { id } = useParams(); // Получаем id из URL
	const dispatch = useDispatch();
	const { isLoading, error, data } = useSelector((state) => state.rick);

	useEffect(() => {
		dispatch(getInfoDetails(id)); // Передаём id в экшен
	}, [dispatch, id]);

	if (isLoading) return <Spinner isLoading={true} />;
	if (error) return <p className='text-red-500'>{error}</p>;
	if (!data)
		return <p className='text-red-500'>К сожалению, товар недоступен</p>;

	return (
		<div>
      
			<h1>{data.title}</h1>
			<img src={data.image} alt={data.title} />
			<p>{data.description}</p>
			<p>Цена: ${data.price}</p>
		</div>
	);
};

export default CardDetails;
