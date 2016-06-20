import take from 'lodash/take';
import { computed } from 'mobx';
import Story from 'Entities/Story';
import { register, resolve } from 'store';
import BaseCollection from './BaseCollection';

export class Stories extends BaseCollection {

	/**
	 * Define the resource of the collection.
	 *
	 * @type {Entity}
	 */
	static Resource = Story;

	@computed get featuredStories() {
		return take(this.items, 3);
	}

}

register('StoryCollection', Stories);

export default resolve('StoryCollection');
