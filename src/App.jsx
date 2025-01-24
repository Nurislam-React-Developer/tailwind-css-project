import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CardDetails from './components/CardDetails';
import CardInfo from './components/CardInfo';

const App = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<CardInfo />} />
				<Route path='/details/:id' element={<CardDetails />} />
			</Routes>
		</div>
	);
};

export default App;
