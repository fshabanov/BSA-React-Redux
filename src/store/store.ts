import { configureStore } from "@reduxjs/toolkit";
import userReducer from "src/store/user/slice";

export const store = configureStore({
	reducer: {
		auth: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
