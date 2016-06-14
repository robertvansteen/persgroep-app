import { computed } from 'mobx';
import Users from 'Collections/Users';
import BaseModel from 'Entities/BaseModel';

export default class Story extends BaseModel {

	static relationships = ['author'];

	@computed get author() {
		return Users.find(this.author_id);
	}
}
