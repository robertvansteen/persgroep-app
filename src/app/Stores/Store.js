import StoryStore from 'Stores/Domain/StoryStore';

class Store {
	constructor() {
		console.log('Store constructor called!');
	}

	stores = {
		story: new StoryStore(),
	}
}

const instance = new Store();
export default instance;
