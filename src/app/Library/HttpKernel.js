import axios from 'axios';

class HttpKernel {

	/**
	 * Construct a new HTTP Kernel.
	 *
	 * @return {void}
	 */
	constructor() {
		if (this.constructor === HttpKernel) {
			throw new TypeError('Abstract class "HttpKernel" cannot be instantiated directly.');
		}

		axios.defaults.baseURL = process.env.API_ENDPOINT;
	}

	/**
	 * Register the request & response middlewares.
	 *
	 * @return {void}
	 */
	registerMiddlewares() {
		this.registerRequestMiddleware();
		this.registerResponseMiddleware();
	}

	/**
	 * Register the request middlewares.
	 *
	 * @return {void}
	 */
	registerRequestMiddleware() {
		this.getRequestMiddleware().forEach((Middleware) => {
			const middleware = new Middleware();
			middleware.register();
		});
	}

	/**
	 * Register the response middlewares.
	 *
	 * @return {void}
	 */
	registerResponseMiddleware() {
		this.getResponseMiddleware().forEach((Middleware) => {
			const middleware = new Middleware();
			middleware.register();
		});
	}

}

export default HttpKernel;
