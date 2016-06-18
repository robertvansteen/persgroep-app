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
}

export default RefreshJWT;
