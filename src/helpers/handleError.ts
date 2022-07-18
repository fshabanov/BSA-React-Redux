import { logout } from 'src/store/user/slice';
import axios from 'axios';
import { AxiosError } from 'axios';
export default function handleError(err: Error | AxiosError, thunkAPI: any) {
	if (axios.isAxiosError(err)) {
		const status = err.response?.status;

		if (status === 401) {
			thunkAPI.dispatch(logout());
		} else {
			console.log(err);
		}
	} else {
		console.log(err);
	}
}
