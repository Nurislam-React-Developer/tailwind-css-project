import React from 'react';

const Header = () => {
	return (
		<header className='flex justify-around items-center bg-gradient-to-r from-slate-400 to-slate-600 p-4 shadow-lg transition-all duration-300'>
			<img
				src='src/assets/img/logo.png'
				alt='logo'
				className='w-[70px] h-[70px] transition-transform duration-300 hover:scale-110'
			/>
			<section>
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
			</section>
		</header>
	);
};

export default Header;
