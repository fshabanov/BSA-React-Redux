import { IBooking } from 'src/@types';
import api from 'src/api/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BOOKINGS } from 'src/api/constants';
// import { setLoading } from "../loading/slice";
import handleError from 'src/helpers/handleError';

export const getBookings = createAsyncThunk(
	'bookings/getBookings',
	async (args, thunkAPI) => {
		// thunkAPI.dispatch(setLoading(true));
		try {
			const res = await api.get(`${BOOKINGS}`);
			const data: IBooking[] = res.data;
			// thunkAPI.dispatch(setLoading(false));
			return data;
		} catch (err: any) {
			// thunkAPI.dispatch(setLoading(false));
			handleError(err, thunkAPI);
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);
