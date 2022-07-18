import React, { useEffect } from 'react';
import { IBooking, IState } from 'src/@types';
import 'src/assets/css/booking.css';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from 'src/hooks/useRouter';
import { AppDispatch } from 'src/store/store';
import { bookingActions } from 'src/store/actions';
import api from 'src/api';
import { BOOKINGS } from 'src/api/constants';
import { removeBooking } from 'src/store/bookings/slice';

const Bookings: React.FC = () => {
	const { user } = useSelector((state: IState) => state.auth);
	const { items } = useSelector((state: IState) => state.bookings);
	const { navigate } = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!user) {
			navigate('/sign-in');
		}
	}, [user, navigate]);

	useEffect(() => {
		if (!items.length) {
			dispatch(bookingActions.getBookings());
		}
	}, [dispatch, items.length]);

	const handleDelete = (id: string) => {
		api
			.delete(`${BOOKINGS}${id}`)
			.then(() => {
				dispatch(removeBooking(id));
			})
			.catch((err) => alert(err.message));
	};

	return (
		<main className='bookings-page'>
			<h1 className='visually-hidden'>Travel App</h1>
			<ul className='bookings__list'>
				{items
					// .sort(
					// 	(a, b) =>
					// 		new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					// )
					.map((booking: IBooking) => {
						const {
							trip: { title, price },
							guests,
							date,
							id,
						} = booking;
						return (
							<li className='booking' key={id}>
								<h3 className='booking__title'>{title}</h3>
								<span className='booking__guests'>{guests} guests</span>
								<span className='booking__date'>
									{new Date(date).toLocaleDateString()}
								</span>
								<span className='booking__total'>{price} $</span>
								<button
									className='booking__cancel'
									title='Cancel booking'
									onClick={() => handleDelete(id)}
								>
									<span className='visually-hidden'>Cancel booking</span>×
								</button>
							</li>
						);
					})}
			</ul>
		</main>
	);
};

export default Bookings;
