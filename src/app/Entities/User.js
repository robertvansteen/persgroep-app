import Users from 'Collections/Users';
import { computed } from 'mobx';
import BaseModel from 'Entities/BaseModel';

export default class User extends BaseModel {

	static relationships = ['stories'];

	@computed get author() {
		return Users.users.get(this.author_id);
	}
}
