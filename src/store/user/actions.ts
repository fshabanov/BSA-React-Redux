import { IUserLogin } from 'src/@types';
import setTokenCookie from 'src/helpers/setToken';
import IUserSignup from 'src/@types/userSignup';
import { AUTH, CURRENT_USER, SIGN_UP, SIGN_IN } from './../../api/constants';
import api from 'src/api/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../loading/slice';
import { logout } from './slice';

export const getUser = createAsyncThunk(
	'user/getUser',
	async (args, thunkAPI) => {
		thunkAPI.dispatch(setLoading(true));
		try {
			const res = await api.get(`${AUTH}${CURRENT_USER}`);
			thunkAPI.dispatch(setLoading(false));
			return res.data;
		} catch (err: any) {
			thunkAPI.dispatch(logout());
			thunkAPI.dispatch(setLoading(false));
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

export const signUp = createAsyncThunk(
	'user/signUp',
	async (user: IUserSignup, thunkAPI) => {
		thunkAPI.dispatch(setLoading(true));
		try {
			const res = await api.post(`${AUTH}${SIGN_UP}`, user);
			const { data } = res;
			setTokenCookie(data.token);
			thunkAPI.dispatch(setLoading(false));
			return data.user;
		} catch (err: any) {
			thunkAPI.dispatch(logout());
			thunkAPI.dispatch(setLoading(false));
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

export const signIn = createAsyncThunk(
	'users/signIn',
	async (user: IUserLogin, thunkAPI) => {
		thunkAPI.dispatch(setLoading(true));
		try {
			const res = await api.post(`${AUTH}${SIGN_IN}`, user);
			const { data } = res;
			setTokenCookie(data.token);
			thunkAPI.dispatch(setLoading(false));
			return data.user;
		} catch (err: any) {
			thunkAPI.dispatch(logout());
			thunkAPI.dispatch(setLoading(false));
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);
