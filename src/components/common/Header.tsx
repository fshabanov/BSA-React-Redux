import React from 'react';
import { Link } from 'react-router-dom';
import briefcase from 'src/assets/images/briefcase.svg';
import profile from 'src/assets/images/user.svg';
import useRouter from 'src/hooks/useRouter';
import 'src/assets/css/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/store/user/slice';
import { AppDispatch } from 'src/store/store';
import { IState } from 'src/@types';

interface Props {}

const Header: React.FC<Props> = () => {
	const { pathname } = useRouter();
	const { user } = useSelector((state: IState) => state.auth);

	const dispatch = useDispatch<AppDispatch>();

	const handleSignOut = () => {
		dispatch(logout());
	};

	return (
		<header className='header'>
			<div className='header__inner'>
				<Link to='/' className='header__logo'>
					Travel App
				</Link>
				{pathname !== '/sign-up' && pathname !== '/sign-in' && (
					<nav className='header__nav'>
						<ul className='nav-header__list'>
							<li className='nav-header__item' title='Bookings'>
								<Link to='/bookings' className='nav-header__inner'>
									<span className='visually-hidden'>Bookings</span>
									<img src={briefcase} alt='icon' />
								</Link>
							</li>
							<li className='nav-header__item' title='Profile'>
								<div className='nav-header__inner profile-nav' tabIndex={0}>
									<span className='visually-hidden'>Profile</span>
									<img src={profile} alt='profile icon' />
									<ul className='profile-nav__list'>
										<li className='profile-nav__item profile-nav__username'>
											{user?.fullName}
										</li>
										<li className='profile-nav__item'>
											<Link
												to='/sign-in'
												className='profile-nav__sign-out button'
												onClick={handleSignOut}
											>
												Sign Out
											</Link>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Header;
