import Stories from 'Collections/Stories';
import { register, resolve } from 'store';
import { observable, computed } from 'mobx';

export const StoryStore = {

		/**
		 * Array of the stories that should be in the current context.
		 *
		 * @type {Array}
		 */
		@observable context: [],

		@computed get stories() {
			return this.context.map((id) => Stories.find(id));
		},

};

register('StoryStore', StoryStore);

export default resolve('StoryStore');
