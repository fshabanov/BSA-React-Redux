import { updateApiToken } from 'src/api';
export default function removeToken(): void {
	localStorage.removeItem('token');
	updateApiToken('');
}
