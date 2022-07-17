import { IUserLogin } from "src/@types";
import setTokenCookie from "src/helpers/setToken";
import IUserSignup from "src/@types/userSignup";
import { AUTH, CURRENT_USER, SIGN_UP, SIGN_IN } from "./../../api/constants";
import api from "src/api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import removeToken from "src/helpers/removeToken";

export const getUser = createAsyncThunk(
	"user/getUser",
	async (args, thunkAPI) => {
		try {
			const res = await api.get(`${AUTH}${CURRENT_USER}`);
			return res.data;
		} catch (err: any) {
			removeToken();
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

export const signUp = createAsyncThunk(
	"user/signUp",
	async (user: IUserSignup, thunkAPI) => {
		try {
			const res = await api.post(`${AUTH}${SIGN_UP}`, user);
			const { data } = res;
			setTokenCookie(data.token);
			return data;
		} catch (err: any) {
			removeToken();
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

export const signIn = createAsyncThunk(
	"users/signIn",
	async (user: IUserLogin, thunkAPI) => {
		try {
			const res = await api.post(`${AUTH}${SIGN_IN}`, user);
			const { data } = res;
			setTokenCookie(data.token);
			return data;
		} catch (err: any) {
			removeToken();
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);
