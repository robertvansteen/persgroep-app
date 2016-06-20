import decode from 'jwt-decode';
import { refresh } from 'Sources/Auth';
import AuthStore from 'Stores/AuthStore';
import RequestMiddleware from 'Library/RequestMiddleware';

class JWT extends RequestMiddleware {

	/**
	 * Set the authorization header on the provided request and return it.
	 *
	 * @param  {Request} request
	 * @return {Request}
	 */
	setAuthorizationHeader(request) {
		return { ...request,
			headers: { ...request.headers,
				Authorization: `Bearer ${AuthStore.token}`,
			},
		};
	}

	/**
	 * Handle outgoing request.
	 *
	 * @param  {Object} request
	 * @return {Object}
	 */
	handle(request) {
		const token = AuthStore.token;
		if (!token) return request;

		const treshold = 60;
		const now = Date.now() / 1000;
		const claims = decode(token);
		const isExpired = (now > claims.exp - treshold);

		if (isExpired && !AuthStore.refreshing) {
			AuthStore.refreshing = true;
			return refresh().then((response) => {
				AuthStore.token = response.data.token;
				AuthStore.refreshing = false;
				return this.setAuthorizationHeader(request);
			});
		}

		return this.setAuthorizationHeader(request);
	}
}

export default JWT;
