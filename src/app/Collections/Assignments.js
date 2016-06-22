import { register, resolve } from 'store';
import Assignment from 'Entities/Assignment';
import BaseCollection from './BaseCollection';

export class Assignments extends BaseCollection {

	/**
	 * Define the resource of the collection.
	 *
	 * @type {Entity}
	 */
	static Resource = Assignment;
}

register('AssignmentCollection', Assignments);

export default resolve('AssignmentCollection');
