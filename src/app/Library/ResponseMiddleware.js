import axios from 'axios';

class ResponseMiddleware {

	/**
	* Register the middleware as interceptor with Axios.
	*
	* @return {void}
	*/
	register() {
		axios.interceptors.response.use(
			(response) => this.handle.call(this, response)
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
}

export default ResponseMiddleware;
