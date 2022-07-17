export default function (): string | null {
	return localStorage.getItem("token");
}
