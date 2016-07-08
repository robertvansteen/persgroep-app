import fetch from 'axios';
import each from 'lodash/each';
import users from 'Collections/Users';
import stories from 'Collections/Stories';
import { storySchema } from 'Stores/Schema';
import { normalize, arrayOf } from 'normalizr';
import categories from 'Collections/Categories';

export function fetchStoriesByCategory(categoryId) {
	return fetch.get(`/categories/${categoryId}/stories?limit=10`)
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

export function publishStory(data, files) {
	const form = new FormData();
	each(data, (value, key) => form.append(key, value));
	each(files, (file, id) => form.append(id, file));
	return fetch.post(`/stories`, form);
}

export function likeStory(id) {
	return fetch.post(`/stories/${id}/likes`);
}

export function unlikeStory(id) {
	return fetch.delete(`/stories/${id}/likes`);
}
