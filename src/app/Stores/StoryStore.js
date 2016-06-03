import { observable, action } from 'mobx';

class StoryStore {
	@observable stories = [];

	@action addStory(story) {
		this.stories.push(story);
	}

	@action addStories(stories) {
		stories.map(story => {
			this.stories.push(story);
		});
	}
}

export default StoryStore;
