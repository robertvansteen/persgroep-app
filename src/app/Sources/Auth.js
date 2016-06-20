import fetch from 'axios';

export function refresh() {
	return fetch.get('/auth/refresh');
}

export function fetchMe() {
	return fetch.get('/me');
}
