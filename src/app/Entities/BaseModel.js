import each from 'lodash/each';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { extendObservable } from 'mobx';

export default class BaseModel {

	/**
	 * Set the relation data for the model.
	 *
	 * @param {Object}
	 */
	setRelationData(data) {
		const relationData = pick(data, this.constructor.relationships);
		each(relationData, (value, key) => extendObservable(this, { [`${key}_id`]: value }));
	}

	/**
	 * Set the data for the model.
	 *
	 * @param {Object}
	 */
	setData(data) {
		const ownData = omit(data, this.constructor.relationships);
		each(ownData, (value, key) => extendObservable(this, { [key]: value }));
	}

	constructor(data) {
		this.setData(data);
		this.setRelationData(data);
	}
}
