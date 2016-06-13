import _ from 'lodash';
import fetch from 'axios';
import Story from 'Entities/Story';
import UserStore from 'Stores/UserStore';
import { register, resolve } from 'store';
import { storySchema } from 'Stores/Schema';
import { normalize, arrayOf } from 'normalizr';
import { observable, computed, action, asMap } from 'mobx';

const KEY = 'story';

export const StoryStore = {
	@observable stories: [],

	@computed get featuredStories() {
		return _.take(this.stories, 3);
	},

	has(id) {
		return !!this.find(id);
	},

	find(id) {
		return this.stories.find(story => story.id === id);
	},

	delete(id) {
		const item = this.find(id);
		return this.stories.remove(item);
	},

	fetchStories() {
		fetch.get(`/stories`)
			.then(response => {
				const data = normalize(response.data, { data: arrayOf(storySchema) });
				UserStore.addUsers(data.entities.users);
				this.addStories(data.entities.stories);
			});
	},

	@action addStory(story) {
		this.stories.push(new Story(story));
	},

	@action addStories(stories) {
		_.each(stories, story => {
			this.addStory(story);
		});
	},

	@action likeStory(ref) {
		const story = this.find(ref.id);
		story.liked = true;

		fetch.post(`/stories/${story.id}/likes`)
			.then(() => story.liked = true)
			.catch(() => story.liked = false);
	},

	@action unlikeStory(ref) {
		const story = this.find(ref.id);
		story.liked = false;

		fetch.delete(`/stories/${story.id}/likes`)
			.then(() => story.liked = false)
			.catch(() => story.liked = true);
	},
};

register(KEY, StoryStore);

export default resolve(KEY);
