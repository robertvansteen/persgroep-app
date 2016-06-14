import fetch from 'axios';
import users from 'Collections/Users';
import stories from 'Collections/Stories';
import { storySchema } from 'Stores/Schema';
import { normalize, arrayOf } from 'normalizr';
import categories from 'Collections/Categories';

export function fetchStoriesByCategory(categoryId) {
	fetch.get(`/categories/${categoryId}/stories?limit=3`)
		.then(response => {
			const data = normalize(response.data, { data: arrayOf(storySchema) });
			categories.addCollection(data.entities.categories);
			users.addCollection(data.entities.users);
			stories.addCollection(data.entities.stories);
			categories.find(categoryId).topStories_id = data.result.data;
		});
}
