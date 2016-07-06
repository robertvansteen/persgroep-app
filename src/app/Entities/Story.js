import Users from 'Collections/Users';
import { computed, action } from 'mobx';
import AuthStore from 'Stores/AuthStore';
import BaseModel from 'Entities/BaseModel';
import { likeStory, unlikeStory } from 'Sources/Stories';

export default class Story extends BaseModel {

	static relationships = ['author'];

	@computed get author() {
		return Users.find(this.author_id);
	}

	/**
	 * Toggle like for the current story.
	 *
	 * @return {void}
	 */
	@action toggleLike() {
		if (!AuthStore.token) return false;

		return this.liked ? this.unlike() : this.like();
	}

	/**
	 * Like the current story.
	 *
	 * @return {void}
	 */
	@action like() {
		if (!AuthStore.token) return false;

		this.liked = true;
		this.like_count++;

		likeStory(this.id);
	}

	/**
	 * Unlike the current story.
	 *
	 * @return {void}
	 */
	@action unlike() {
		if (!AuthStore.token) return false;

		this.liked = false;
		this.like_count--;

		unlikeStory(this.id);
	}
}
