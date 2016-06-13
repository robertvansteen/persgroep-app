import { observable, asMap } from 'mobx';
import { register, resolve } from 'store';

const KEY = 'user';

export const UserStore = {
	@observable users: asMap([]),

	addUsers(users) {
		this.users.merge(users);
	},
};

register(KEY, UserStore);

export default resolve(KEY);
