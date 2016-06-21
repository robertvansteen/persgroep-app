import fetch from 'axios';
import AuthStore from 'Stores/AuthStore';

export function refresh() {
	return fetch.get('/auth/refresh')
		.then(response => AuthStore.token = response.data.token);
}

export function fetchMe() {
	return fetch.get('/me')
		.then(response => AuthStore.user = response.data.user);
}
