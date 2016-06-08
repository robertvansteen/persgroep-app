import _ from 'lodash';
import fetch from 'axios';
import { observable, action, asMap } from 'mobx';

class StoryStore {
	@observable stories = asMap([]);

	fetchStories() {
		fetch.get(`${process.env.API_ENDPOINT}/api/stories`)
			.then(response => this.addStories(response.data.data));
	}

	@action addStory(story) {
		this.stories.set(story.id, story);
	}

	@action addStories(stories) {
		const map = _.keyBy(stories, 'id');
		this.stories.merge(map);
	}

	@action likeStory(ref) {
		const story = this.stories.get(ref.id);
		story.liked = true;

		fetch.post(`${process.env.API_ENDPOINT}/api/stories/${story.id}/likes`)
			.then(() => story.liked = true)
			.catch(() => story.liked = false);
	}

	@action unlikeStory(ref) {
		const story = this.stories.get(ref.id);
		story.liked = false;

		fetch.delete(`${process.env.API_ENDPOINT}/api/stories/${story.id}/likes`)
			.then(() => story.liked = false)
			.catch(() => story.liked = true);
	}
}

export default StoryStore;
