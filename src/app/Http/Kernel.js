import HttpKernel from 'Library/HttpKernel';
import JWT from 'Http/Middleware/Requests/JWT';

class Kernel extends HttpKernel {
	/**
	 * Get the request middlewares.
	 *
	 * @return {Array}
	 */
	getRequestMiddleware() {
		return [
			JWT,
		];
	}

	/**
	 * Get the response middlewares.
	 *
	 * @return {Array}
	 */
	getResponseMiddleware() {
		return [];
	}
}

export default Kernel;
