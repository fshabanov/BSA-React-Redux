import React from 'react';
import useRouter from 'src/hooks/useRouter';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'src/components/Modal';
import { IState, ITrip } from 'src/@types';
import 'src/assets/css/tripPage.css';
import NewTrip from 'src/components/trip/NewTrip';
import { useDispatch, useSelector } from 'react-redux';
import api from 'src/api';
import { TRIPS } from 'src/api/constants';
import axios, { AxiosError } from 'axios';
import { AppDispatch } from 'src/store/store';
import { logout } from 'src/store/user/slice';

const TripPage: React.FC = () => {
	const { user } = useSelector((state: IState) => state.auth);
	const { isLoading } = useSelector((state: IState) => state.loading);
	const { query, navigate } = useRouter();
	const { id } = query;
	const [trip, setTrip] = useState<ITrip | null>(null);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!user && !isLoading) {
			navigate('/sign-in');
		}
	}, [user, isLoading, navigate]);

	useEffect(() => {
		if (id) {
			api
				.get(`${TRIPS}${id}`)
				.then((res) => {
					const { data } = res;
					setTrip(data);
				})
				.catch((err: Error | AxiosError) => {
					if (axios.isAxiosError(err)) {
						const status = err.response?.status;
						if (status === 404) {
							navigate('/');
						} else if (status === 401) {
							dispatch(logout());
						}
					} else {
						alert(err.message);
					}
				});
		}
	}, [id, dispatch, navigate]);
	const [showModal, setShowModal] = useState(false);

	if (!trip) {
		return null;
	}
	const { title, price, description, image, duration, level } = trip as ITrip;

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	return (
		<>
			<main className='trip-page'>
				<h1 className='visually-hidden'>Travel App</h1>
				<div className='trip'>
					<img src={image} className='trip__img' alt='trip image' />
					<div className='trip__content'>
						<div className='trip-info'>
							<h3 className='trip-info__title'>{title}</h3>
							<div className='trip-info__content'>
								<span className='trip-info__duration'>
									<strong>{duration}</strong> days
								</span>
								<span className='trip-info__level'>{level}</span>
							</div>
						</div>
						<div className='trip__description'>{description}</div>
						<div className='trip-price'>
							<span>Price</span>
							<strong className='trip-price__value'>{price} $</strong>
						</div>
						<button className='trip__button button' onClick={handleOpenModal}>
							Book a trip
						</button>
					</div>
				</div>
			</main>
			{showModal && (
				<Modal>
					<NewTrip trip={trip as ITrip} onClose={handleCloseModal} />
				</Modal>
			)}
		</>
	);
};

export default TripPage;
