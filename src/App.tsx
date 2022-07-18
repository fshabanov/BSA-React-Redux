import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IState } from './@types';
import Loading from './components/Loading';
import Suspense from './components/Suspense';
import { getUser } from './store/user/actions';
import { AppDispatch } from './store/store';
const Footer = React.lazy(() => import('./components/common/Footer'));
const Header = React.lazy(() => import('./components/common/Header'));
const Bookings = React.lazy(() => import('./pages/Bookings'));
const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const TripPage = React.lazy(() => import('./pages/TripPage'));

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading } = useSelector((state: IState) => state.loading);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Header />
			{isLoading ? (
				<Loading />
			) : (
				<Routes>
					<Route
						path='/'
						element={
							<Suspense>
								<Home />
							</Suspense>
						}
					/>
					<Route
						path='sign-up'
						element={
							<Suspense>
								<SignUp />
							</Suspense>
						}
					/>
					<Route
						path='sign-in'
						element={
							<Suspense>
								<SignIn />
							</Suspense>
						}
					/>
					<Route
						path='trip/:id'
						element={
							<Suspense>
								<TripPage />
							</Suspense>
						}
					/>
					<Route
						path='bookings'
						element={
							<Suspense>
								<Bookings />
							</Suspense>
						}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			)}
			<Footer />
		</BrowserRouter>
	);
}

export default App;
