import { Link } from 'react-router-dom';

const ProductList = () => {
  return (
		<div>
			{products.map((product) => (
				<div key={product.id}>
					<h2>{product.title}</h2>
					<Link to={`/product/${product.id}`}>Подробнее</Link>
				</div>
			))}
		</div>
	);
}