import AuthStore from 'Stores/AuthStore';
import RequestMiddleware from 'Library/RequestMiddleware';

class JWT extends RequestMiddleware {

	/**
	 * Handle outgoing request.
	 *
	 * @param  {Object} request
	 * @return {Object}
	 */
	handle(request) {
		return { ...request,
			headers: { ...request.headers,
				Authorization: `Bearer ${AuthStore.token}`,
			},
		};
	}
}

export default JWT;
