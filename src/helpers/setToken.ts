import { updateApiToken } from "src/api";

export default function (token: string): void {
	localStorage.setItem("token", token);
	updateApiToken(token);
}
