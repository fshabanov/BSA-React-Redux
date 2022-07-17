import { signIn, signUp, getUser } from "./actions";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import removeToken from "src/helpers/removeToken";

const initialState = {
	user: null,
	isLoading: true,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
		},
		logout: (state) => {
			state.user = null;
			state.isLoading = false;
			removeToken();
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			isAnyOf(getUser.pending, signUp.pending, signIn.pending),
			(state) => {
				state.isLoading = true;
			}
		);
		builder.addMatcher(
			isAnyOf(getUser.fulfilled, signUp.fulfilled, signIn.fulfilled),
			(state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
			}
		);
		builder.addMatcher(
			isAnyOf(getUser.rejected, signUp.rejected, signIn.rejected),
			(state) => {
				state.isLoading = false;
				state.user = null;
			}
		);
	},
});

export default userSlice.reducer;

export const { login, logout } = userSlice.actions;
