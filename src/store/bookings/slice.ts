import { IBooking } from "src/@types";
import { getBookings } from "./actions";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState: { items: IBooking[] } = {
	items: [],
};

const bookingSlice = createSlice({
	name: "bookings",
	initialState,
	reducers: {
		addNewBooking: (state, action) => {
			state.items.push(action.payload);
		},
		removeBooking: (state, action) => {
			state.items = state.items.filter(
				(booking) => booking.id !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(isAnyOf(getBookings.fulfilled), (state, action) => {
			state.items = action.payload;
		});
	},
});

export default bookingSlice.reducer;

export const { addNewBooking, removeBooking } = bookingSlice.actions;
