import Users from 'Collections/Users';
import { computed, action } from 'mobx';
import BaseModel from 'Entities/BaseModel';

export default class Story extends BaseModel {

	static relationships = ['author'];

	@computed get author() {
		return Users.find(this.author_id);
	}

	/**
	 * Like the current story.
	 *
	 * @return {void}
	 */
	@action like() {
		this.liked_count = 1;
	}

	/**
	 * Unlike the current story.
	 *
	 * @return {void}
	 */
	@action unlike() {
		this.liked_count = 0;
	}
}
