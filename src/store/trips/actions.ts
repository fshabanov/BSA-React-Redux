import handleError from "src/helpers/handleError";
import { ITrip } from "src/@types";
import { TRIPS } from "./../../api/constants";
import api from "src/api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTrips = createAsyncThunk(
	"trips/getTrips",
	async (args, thunkAPI) => {
		try {
			const response = await api.get(`${TRIPS}`);
			const data: ITrip[] = response.data;
			return data;
		} catch (err: any /* AxiosError */) {
			console.log(err);
			handleError(err, thunkAPI);
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);
