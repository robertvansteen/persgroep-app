import Category from 'Entities/Category';
import { register, resolve } from 'store';
import BaseCollection from './BaseCollection';

export class Categories extends BaseCollection {

	/**
	 * Define the resource of the collection.
	 *
	 * @type {Entity}
	 */
	static Resource = Category;

}

register('CategoryCollection', Categories);

export default resolve('CategoryCollection');
