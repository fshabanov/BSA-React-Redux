import { configureStore } from "@reduxjs/toolkit";
import userReducer from "src/store/user/slice";
import tripReducer from "src/store/trips/slice";
import loadingReducer from "src/store/loading/slice";

export const store = configureStore({
	reducer: {
		auth: userReducer,
		trips: tripReducer,
		loading: loadingReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
