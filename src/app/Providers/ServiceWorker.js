
class ServiceWorkerProvider {

	/**
	 * Register the service provder with the container.
	 *
	 * @param  {container} container
	 * @return {void}
	 */
	register(container) {
		container.registerProvider('service-worker', this);
	}

	/**
	 * Boot up the service provider.
	 *
	 * @return {void}
	 */
	boot() {
		if (!process.env.SERVICE_WORKER) return false;

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js');
		}
	}
}

export default ServiceWorkerProvider;
