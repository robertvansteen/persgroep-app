import axios from 'axios';

class ResponseMiddleware {

	/**
	* Register the middleware as interceptor with Axios.
	*
	* @return {void}
	*/
	register() {
		axios.interceptors.response.use(
			(response) => this.handle.call(this, response),
			(error) => this.handleError.call(this, error),
		);
	}

	/**
	* Handle an incoming response.
	*
	* @param  {object} response - The incoming response.
	* @return {object} - The response that will be passed along.
	*/
	handle(response) {
		return response;
	}

	/**
	 * Handle an incoming error.
	 *
	 * @param  {Error} error
	 * @return {Promise}
	 */
	handleError(error) {
		return Promise.reject(error);
	}
}

export default ResponseMiddleware;
