import { updateApiToken } from "src/api";
export default function (): void {
	localStorage.removeItem("token");
	updateApiToken("");
}
