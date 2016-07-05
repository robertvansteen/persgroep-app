class Container {

	/**
	 * An object containing the registered providers.
	 *
	 * @type {Object}
	 */
	providers = {}

	/**
	 * Register a provider in the container.
	 *
	 * @param  {String} key
	 * @param  {Provider} provider
	 * @return {void}
	 */
	registerProvider(key, provider) {
		this.providers[key] = provider;
	}
}

/**
 * Create a singleton instance we export.
 */
const container = new Container();

export default container;
