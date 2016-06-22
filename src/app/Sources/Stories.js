import fetch from 'axios';
import users from 'Collections/Users';
import stories from 'Collections/Stories';
import { storySchema } from 'Stores/Schema';
import { normalize, arrayOf } from 'normalizr';
import categories from 'Collections/Categories';

export function fetchStoriesByCategory(categoryId) {
	return fetch.get(`/categories/${categoryId}/stories?limit=3`)
		.then(response => {
			const data = normalize(response.data, { data: arrayOf(storySchema) });
			categories.addCollection(data.entities.categories, false);
			users.addCollection(data.entities.users);
			stories.addCollection(data.entities.stories);
			return data;
		});
}

export function fetchStory(id) {
	return fetch.get(`/stories/${id}`)
		.then(response => {
			const data = normalize(response.data.story, storySchema);
			users.addCollection(data.entities.users);
			stories.addCollection(data.entities.stories);
			return data;
		});
}

export function publishStory(payload) {
	return fetch.post(`/stories`, payload);
}

export function likeStory(id) {
	stories.find(id).like();
	return fetch.post(`/stories/${id}/likes`)
		.then(() => stories.find(id).like())
		.catch(() => stories.find(id).unlike());
}

export function unlikeStory(id) {
	stories.find(id).unlike();
	return fetch.delete(`/stories/${id}/likes`)
		.then(() => stories.find(id).unlike())
		.catch(() => stories.find(id).like());
}
