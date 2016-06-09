/**
 * The store container.
 */
const storeContainer = {};

/**
 * Create a new store container.
 */
export function createStore(stores, initialState) {
	for (const key of Object.keys(stores)) {
		const Store = stores[key];
		storeContainer[key] = new Store(initialState.key);
	}
}

export { storeContainer as store };
