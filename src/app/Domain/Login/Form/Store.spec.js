import 'Library/TestSetup';
import { expect } from 'chai';

/**
 * The instance of the store we are testing.
 */
let store;

/**
 * Test the login store.
 */
describe('Login Store', () => {
	beforeEach(() => {
		store = require('inject!./Store')({}).LoginStore;
	});

	it('should allow you to update an input', () => {
		store.updateInput('email', 'foo');
		store.input.email.value.should.equals('foo');
	});

	it('should give error when submitting wrong values', () => {
		store.updateInput('email', '');
		expect(store.errors.email).to.be.equal('Email can\'t be blank');
		store.updateInput('email', 'foo');
		expect(store.errors.email).to.be.equal('Email is not a valid email');
	});
});
