import fetch from 'axios';

export function refresh() {
	return fetch.get('/auth/refresh');
}
