import AuthStore from 'Stores/AuthStore';
import ResponseMiddleware from 'Library/ResponseMiddleware';

class RefreshJWT extends ResponseMiddleware {

	/**
	 * Handle incoming response.
	 *
	 * @param  {Object} response
	 * @return {Object}
	 */
	handle(response) {
		const auth = response.headers.authorization;
		// Check if the server provided us with a fresh new token.
		if (auth) {
			const token = auth.split('Bearer ').pop();
			AuthStore.token = token;
		}

		return response;
	}

	/**
	 * Handle error.
	 * Whenever the response of the server is of status code 401 (unauthorized)
	 * remove the current stored token because it's invalid.
	 *
	 * @param  {Error} error
	 * @return {Promise}
	 */
	handleError(error) {
		if (error.status === 401) {
			AuthStore.token = null;
		}

		return Promise.reject(error);
	}
}

export default RefreshJWT;
