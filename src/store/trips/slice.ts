import { ITrip } from "src/@types";
import { getTrips } from "./actions";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState: { items: ITrip[] } = {
	items: [],
};

const tripSlice = createSlice({
	name: "trips",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// builder.addMatcher(isAnyOf(getTrips.pending), (state) => {
		// 	// state.isLoading = true;
		// });
		builder.addMatcher(isAnyOf(getTrips.fulfilled), (state, action) => {
			// state.isLoading = false;
			state.items = action.payload;
		});
		// builder.addMatcher(isAnyOf(getTrips.rejected), (state, action) => {
		// 	// state.isLoading = false;
		// 	console.log(action);
		// });
	},
});

export default tripSlice.reducer;
