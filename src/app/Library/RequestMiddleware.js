import axios from 'axios';

class RequestMiddleware {

	/**
	* Register the middleware as interceptor with Axios.
	*
	* @return {void}
	*/
	register() {
		axios.interceptors.request.use(
			(request) => this.handle.call(this, request)
		);
	}

	/**
	* Handle an outgoing request.
	*
	* @param  {object} request - The outgoing request.
	* @return {object} - The request that will be passed along.
	*/
	handle(request) {
		return request;
	}
}

export default RequestMiddleware;
