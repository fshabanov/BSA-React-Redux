import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "src/@types";
import useRouter from "src/hooks/useRouter";
import Filter from "../components/Filter";
import Trips from "../components/trip/Trips";

const Home: React.FC = () => {
	const { user } = useSelector((state: IState) => state.auth);
	const { navigate } = useRouter();

	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		}
	}, [user]);
	// Filter states
	const [search, setSearch] = useState("");
	const [duration, setDuration] = useState("");
	const [level, setLevel] = useState("");
	return (
		<main>
			<h1 className="visually-hidden">Travel App</h1>
			<Filter
				search={search}
				setSearch={setSearch}
				duration={duration}
				setDuration={setDuration}
				level={level}
				setLevel={setLevel}
			/>
			<Trips search={search} duration={duration} level={level} />
		</main>
	);
};

export default Home;
