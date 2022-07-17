import IUser from "./user";

export default interface IState {
	auth: {
		user: IUser;
		isLoading: boolean;
	};
}
