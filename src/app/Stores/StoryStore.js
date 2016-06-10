import _ from 'lodash';
import fetch from 'axios';
import { register, resolve } from 'store';
import { observable, action, asMap } from 'mobx';

const KEY = 'story';

export const StoryStore = {
	@observable stories: asMap([]),

	fetchStories() {
		fetch.get(`/stories`)
			.then(response => this.addStories(response.data.data));
	},

	@action addStory(story) {
		this.stories.set(story.id, story);
	},

	@action addStories(stories) {
		const map = _.keyBy(stories, 'id');
		this.stories.merge(map);
	},

	@action likeStory(ref) {
		const story = this.stories.get(ref.id);
		story.liked = true;

		fetch.post(`/stories/${story.id}/likes`)
			.then(() => story.liked = true)
			.catch(() => story.liked = false);
	},

	@action unlikeStory(ref) {
		const story = this.stories.get(ref.id);
		story.liked = false;

		fetch.delete(`/stories/${story.id}/likes`)
			.then(() => story.liked = false)
			.catch(() => story.liked = true);
	},
};

register(KEY, StoryStore);

export default resolve(KEY);
