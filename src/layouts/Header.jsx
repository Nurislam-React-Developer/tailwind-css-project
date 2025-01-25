import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='flex justify-between items-center bg-gradient-to-r from-slate-400 to-slate-600 p-3 shadow-lg transition-all duration-300'>
			{/* Логотип */}
			<img
				src='src/assets/img/logo.png'
				alt='logo'
				className='w-[60px] h-[60px] transition-transform duration-300 hover:scale-110'
			/>

			<nav className='flex-1 flex justify-center'>
				<ul className='flex gap-20 text-cyan-300 cursor-pointer'>
					{['Home', 'About', 'Products'].map((item) => (
						<li
							key={item}
							className='relative hover:text-white cursor-pointer group'
						>
							{item}
							<span className='absolute bottom-0 left-0 w-0 h-1 bg-cyan-300 transition-all duration-300 group-hover:w-full'></span>
						</li>
					))}
				</ul>
			</nav>

			{/* Корзина */}
			<Link to='/cart'>
				<button className='relative flex items-center gap-2 text-white bg-cyan-500 px-4 py-2 rounded-full hover:bg-cyan-600 transition-all'>
					<img
						src='src/assets/img/basket.png'
						alt='basket'
						className='w-[24px] h-[24px]'
					/>
					<span className='text-sm font-medium'>Cart</span>
				</button>
			</Link>
		</header>
	);
};

export default Header;
