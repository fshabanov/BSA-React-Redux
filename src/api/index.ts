import getToken from "src/helpers/getToken";
import { BASE_URL } from "./constants";
import axios from "axios";

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${getToken()}`,
	},
});

export default api;
