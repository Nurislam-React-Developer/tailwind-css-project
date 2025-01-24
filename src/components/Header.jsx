import React from 'react';

const Header = () => {
	return (
		<header className='flex justify-around items-center bg-slate-400'>
			<img
				src="src/assets/img/logo.png"
				alt='logo'
				className='w-[70px] h-[70px]'
			/>
			<section>
				<ul className='flex gap-20 text-cyan-300 cursor-wait'>
					<li className='hover:border-b-2 transition-all'>Home</li>
					<li className='hover:border-b-2 transition-all'>About</li>
					<li className='hover:border-b-2 transition-all'>Products</li>
				</ul>
			</section>
		</header>
	);
};

export default Header;
