import { updateApiToken } from 'src/api';

export default function setToken(token: string): void {
	localStorage.setItem('token', token);
	updateApiToken(token);
}
