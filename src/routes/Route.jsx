import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CardInfo from '../components/CardInfo';
import BaseLayout from '../layouts/BaseLayout';
import CardDetails from '../components/CardDetails';

const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [
			{
				path: '/',
				element: <CardInfo />,
				index: true,
			},
			{
				path: '/details/:id',
        element: <CardDetails/>
			},
		],
	},
]);

const AppRoutes = () => {
  return <RouterProvider router={router}/>
}

export default AppRoutes