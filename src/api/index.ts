import getToken from "src/helpers/getToken";
import { BASE_URL } from "./constants";
import axios from "axios";

const api = axios.create({
	baseURL: BASE_URL,
});

function updateApiToken(token: string) {
	api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

updateApiToken(getToken() || "");

export default api;

export { updateApiToken };
