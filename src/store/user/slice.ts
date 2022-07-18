import { signIn, signUp, getUser } from "./actions";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import removeToken from "src/helpers/removeToken";

const initialState = {
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
			removeToken();
		},
	},
	extraReducers: (builder) => {
		// builder.addMatcher(
		// 	isAnyOf(getUser.pending, signUp.pending, signIn.pending),
		// 	(state) => {
		// 	}
		// );
		builder.addMatcher(
			isAnyOf(getUser.fulfilled, signUp.fulfilled, signIn.fulfilled),
			(state, action) => {
				state.user = action.payload;
			}
		);
		builder.addMatcher(
			isAnyOf(getUser.rejected, signUp.rejected, signIn.rejected),
			(state) => {
				state.user = null;
			}
		);
	},
});

export default userSlice.reducer;

export const { login, logout } = userSlice.actions;
