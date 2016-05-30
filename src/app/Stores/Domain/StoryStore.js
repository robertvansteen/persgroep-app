import { observable, action, computed } from 'mobx';

class StoryStore {
	@observable stories = []

	@action addStories(stories) {
		this.stories = stories;
	}

	@computed get total() {
		return this.stories.length;
	}
}

const instance = new StoryStore();
export default instance;
