/**
 * The container that holds all the stores.
 *
 * @type {Object}
 */
const container = {};

/**
 * Register a new store.
 *
 * @param  {String} key
 * @param  {Object} store
 *
 * @return {void}
 */
export function register(key, store) {
	container[key] = store;
}

/**
 * Resolve a store from the store container.
 *
 * @param  {String} key
 * @return {Object}
 */
export function resolve(key) {
	return container[key];
}
