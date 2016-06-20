import validate from 'validate.js';
import AuthStore from 'Stores/AuthStore';
import mapValues from 'lodash/mapValues';
import { register, resolve } from 'store';
import { observable, action, computed } from 'mobx';

/**
 * The key of the store.
 *
 * @type {String}
 */
const KEY = 'login';

export const LoginStore = {
	/**
	 * Validation rules of the form.
	 *
	 * @type {Object}
	 */
	rules: {
		email: {
			presence: true,
			email: true,
		},
		password: {
			presence: true,
		},
	},

	@observable input: {
		email: { value: '', touched: false },
		password: { value: '', touched: false },
	},

	@computed get errors() {
		const errors = validate(this.getValues(), this.rules);
		return mapValues(errors, error => error[0]);
	},

	@action updateInput(name, value) {
		this.input[name].value = value;
	},

	@action submit() {
		AuthStore.authenticate(this.getValues());
	},

	/**
	 * Get the values from the input.
	 *
	 * @return {Object}
	 */
	getValues() {
		return mapValues(this.input, input => input.value);
	},
};

register(KEY, LoginStore);

export default resolve(KEY);
