import _ from 'lodash';
import { extendObservable } from 'mobx';

export default class BaseModel {

	/**
	 * Set the relation data for the model.
	 *
	 * @param {Object}
	 */
	setRelationData(data) {
		const relationData = _.pick(data, this.constructor.relationships);
		_.each(relationData, (value, key) => extendObservable(this, { [`${key}_id`]: value }));
	}

	/**
	 * Set the data for the model.
	 *
	 * @param {Object}
	 */
	setData(data) {
		const ownData = _.omit(data, this.constructor.relationships);
		_.each(ownData, (value, key) => extendObservable(this, { [key]: value }));
	}

	constructor(data) {
		this.setData(data);
		this.setRelationData(data);
	}
}
