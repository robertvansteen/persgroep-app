import UserStore from 'Stores/UserStore';
import BaseModel from 'Entities/BaseModel';
import { observable, computed } from 'mobx';

export default class Story extends BaseModel {

	static relationships = ['author'];

	@computed get author() {
		return UserStore.users.get(this.author_id);
	}
}
