import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IState, ITrip } from "src/@types";
import filterDuration from "src/helpers/filterDuration";
import Trip from "./Trip";
import "src/assets/css/trips.css";
import { useSelector } from "react-redux";

interface Props {
	search: string;
	duration: string;
	level: string;
}

const Trips: React.FC<Props> = ({ duration, level, search }) => {
	const { items } = useSelector((state: IState) => state.trips);
	const [filteredTrips, setFilteredTrips] = useState<ITrip[]>(items);

	useEffect(() => {
		const filtered = items.filter((trip) => {
			return (
				trip.title.toLowerCase().includes(search.toLowerCase()) &&
				filterDuration(duration, trip) &&
				trip.level.includes(level)
			);
		});
		setFilteredTrips(filtered);
	}, [search, duration, level, items]);

	return (
		<section className="trips">
			<h2 className="visually-hidden">Trips List</h2>
			<ul className="trip-list">
				{filteredTrips.map((trip) => (
					<Trip trip={trip} key={trip.id} />
				))}
			</ul>
		</section>
	);
};

export default Trips;
