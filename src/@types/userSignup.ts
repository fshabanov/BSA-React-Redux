import { IUserLogin } from "src/@types";
export default interface IUserSignup extends IUserLogin {
	fullName: string;
}
