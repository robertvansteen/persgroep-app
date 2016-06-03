import StoryStore from 'Stores/StoryStore';
import { createStore, store } from 'Utils/Store';

const stores = {
	story: StoryStore,
};

const initialState = {};

createStore(
	stores,
	initialState,
);

export default store;
