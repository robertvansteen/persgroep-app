import validate from 'validate.js';
import AuthStore from 'Stores/AuthStore';
import mapValues from 'lodash/mapValues';
import { register, resolve } from 'store';
import { observable, action, computed } from 'mobx';

export default class LoginFormStore {

	/**
	 * Validation rules of the form.
	 *
	 * @type {Object}
	 */
	rules = {
		email: {
			presence: true,
			email: true,
		},
		password: {
			presence: true,
		},
	}

	/**
	 * The input of the form.
	 *
	 * @type {Object}
	 */
	@observable input = {
		email: { value: '', touched: false },
		password: { value: '', touched: false },
	}

	/**
	 * Error message from the server.
	 *
	 * @type {String}
	 */
	@observable errorMessage = null

	/**
	 * Indicates if the form is submitting.
	 *
	 * @type {Boolean}
	 */
	@observable submitting = false;

	/**
	 * Computed error values
	 *
	 * @return {Object}
	 */
	@computed get errors() {
		const errors = validate(this.getValues(), this.rules);
		return mapValues(errors, error => error[0]);
	}

	/**
	 * Update the input of the form.
	 *
	 * @param  {String} name
	 * @param  {String} value
	 * @return {void
	 */
	@action updateInput(name, value) {
		this.input[name].value = value;
	}

	/**
	 * Submit the form.
	 *
	 * @return {void}
	 */
	@action submit() {
		this.errorMessage = null;
		this.submitting = true;

		AuthStore.authenticate(this.getValues())
			.catch(error => {
				if (error.status === 401) this.errorMessage = 'Invalid credentials';
				else this.errorMessage = 'Something went wrong, please try again.';
			})
			.then(() => this.submitting = false);
	}

	/**
	 * Get the values from the input.
	 *
	 * @return {Object}
	 */
	getValues() {
		return mapValues(this.input, input => input.value);
	}
}
