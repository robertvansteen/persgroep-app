import fetch from 'axios';
import categories from 'Collections/Categories';

export function fetchCategories() {
	return fetch.get('/categories')
		.then(response =>
				categories.addCollection(response.data.categories, false)
		);
}
