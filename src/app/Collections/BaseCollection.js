import each from 'lodash/each';
import { observable } from 'mobx';
import BaseModel from 'Entities/BaseModel';

export default class BaseCollection {

	/**
	 * Construct a new collection.
	 * This class is an abstract class and therefore can not be
	 * instantiated directly.
	 *
	 * This class also requires a Resource property to be set statically that
	 * must be a class that inherits the Base Model.
	 */
	constructor() {
		if (this.constructor === BaseCollection) {
			throw new TypeError('Abstract class "BaseCollection" cannot be instantiated directly.');
		}

		if (
			!this.constructor.Resource ||
			!this.constructor.Resource.prototype instanceof BaseModel
		) {
			throw new TypeError('Resource should be extendable of BaseModel');
		}
	}

	/**
	 * The items of the collection.
	 *
	 * @type {Array}
	 */
	@observable items = []

	/**
	 * Returns all the items of the collection.
	 *
	 * @return Array
	 */
	all() {
		return this.items;
	}

	/**
	 * Add an item to the collection.
	 *
	 * @param  {Array|Object} item
	 * @param  {Boolean} replace
	 * @return {void}
	 */
	add(item, replace = true) {
		if (Array.isArray(item)) {
			return each(item, x => this.add(x));
		}

		const index = this.findIndex(item.id);

		if (index >= 0) {
			if (!replace) return false;
			this.items[index] = new this.constructor.Resource(item);
		} else {
			this.items.push(new this.constructor.Resource(item));
		}
	}

	/**
	 * Add an collection (object) to the collection.
	 *
	 * @param  {Object} collection
	 * @param  {Boolean} replace
	 * @return {void}
	 */
	addCollection(collection, replace = true) {
		return each(collection, item => {
			this.add(item, replace);
		});
	}

	/**
	 * Check if the collection has an item with the provided ID.
	 *
	 * @param  {String}  id
	 * @return {Boolean}
	 */
	has(id) {
		return !!this.find(id);
	}

	/**
	 * Find an item in the collection by it's ID.
	 * Returns null if the item can't be found.
	 *
	 * @param  {String} id
	 * @return {Object|null}
	 */
	find(id) {
		return this.items.find(item => item.id === id);
	}

	/**
	 * Find the index in the array of the provided item ID.
	 * Returns -1 when the item can't be found.
	 *
	 * @param  {String} id
	 * @return {Integer}
	 */
	findIndex(id) {
		return this.items.findIndex(item => item.id === id);
	}

	/**
	 * Delete an item from the collection by it's ID.
	 *
	 * @param  {String} id
	 * @return {Boolean}
	 */
	delete(id) {
		const item = this.find(id);
		return this.items.remove(item);
	}

}
