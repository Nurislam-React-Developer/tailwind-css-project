import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CardInfo from '../components/CardInfo';
import BaseLayout from '../layouts/BaseLayout';
import CardDetails from '../components/CardDetails';
import Cart from '../components/Cart';

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
      {
        path: '/cart',
        element: <Cart/>
      }
		],
	},
]);

const AppRoutes = () => {
  return <RouterProvider router={router}/>
}

export default AppRoutes