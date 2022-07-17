import React, { useEffect } from "react";
import { IBooking, IState } from "src/@types";
import bookings from "src/data/bookings.json";
import "src/assets/css/booking.css";
import { useSelector } from "react-redux";
import useRouter from "src/hooks/useRouter";

const Bookings: React.FC = () => {
	const { user } = useSelector((state: IState) => state.auth);
	const { navigate } = useRouter();

	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		}
	}, [user]);

	const [bookingsToShow, setBookingsToShow] =
		React.useState<IBooking[]>(bookings);

	const handleDelete = (id: string) => {
		const newBookings = bookingsToShow.filter((booking) => booking.id !== id);
		setBookingsToShow(newBookings);
	};

	return (
		<main className="bookings-page">
			<h1 className="visually-hidden">Travel App</h1>
			<ul className="bookings__list">
				{bookingsToShow
					.sort(
						(a, b) =>
							new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					)
					.map((booking: IBooking) => {
						const {
							trip: { title, price },
							guests,
							date,
							id,
						} = booking;
						return (
							<li className="booking" key={id}>
								<h3 className="booking__title">{title}</h3>
								<span className="booking__guests">{guests} guests</span>
								<span className="booking__date">
									{new Date(date).toLocaleDateString()}
								</span>
								<span className="booking__total">{price} $</span>
								<button
									className="booking__cancel"
									title="Cancel booking"
									onClick={() => handleDelete(id)}
								>
									<span className="visually-hidden">Cancel booking</span>×
								</button>
							</li>
						);
					})}
			</ul>
		</main>
	);
};

export default Bookings;
