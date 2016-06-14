import User from 'Entities/User';
import { register, resolve } from 'store';
import BaseCollection from './BaseCollection';

export class Users extends BaseCollection {

	/**
	 * Define the resource of the collection.
	 *
	 * @type {Entity}
	 */
	static Resource = User;

}

register('UserCollection', Users);

export default resolve('UserCollection');
