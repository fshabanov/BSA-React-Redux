import { ITrip } from "src/@types";
import IUser from "./user";

export default interface IState {
	auth: {
		user: IUser;
	};
	trips: {
		items: ITrip[];
	};
	loading: {
		isLoading: boolean;
	};
}
