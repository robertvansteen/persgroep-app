import fetch from 'axios';
import cookie from 'js-cookie';
import { observable, autorun } from 'mobx';
import { register, resolve } from 'store';

export class AuthStore {

	/**
	 * The JWT token.
	 */
	@observable token = cookie.get('token');

	/**
	 * Persist the token in a cookie.
	 * Whenever the token is updated in the store, also set the cookie.
	 */
	persistCookie = autorun(() => {
		cookie.set('token', this.token);
	});

	authenticate(data = {}) {
		return fetch.post('/authenticate', data)
			.then(response => {
				const token = response.data.token;
				this.token = token;
				cookie.set('token', token);
			});
	}
}

register('AuthStore', AuthStore);

export default resolve('AuthStore');
