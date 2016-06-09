import fetch from 'axios';
import cookie from 'js-cookie';
import { observable } from 'mobx';
import { register, resolve } from 'store';

/**
 * Define the key of the store.
 *
 * @type {String}
 */
const KEY = 'auth';

export const AuthStore = {
	@observable token: null,

	authenticate(data = {}) {
		return fetch.post('/authenticate', data)
			.then(response => {
				const token = response.data.token;
				this.token = token;
				cookie.set('token', token);
			});
	},
};

register(KEY, AuthStore);

export default resolve(KEY);
