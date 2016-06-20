import sinon from 'sinon';
import { expect } from 'chai';
import { AuthStore } from 'Stores/AuthStore';

// Imports we are going to stub.
import * as fetch from 'axios';
import * as cookie from 'js-cookie';

/**
 * The sinon sandbox of the test.
 */
let sandbox;

/**
 * Instance of the store we are going to test.
 */
let store;

/**
 * Thest the auth store.
 */
describe('Auth Store', () => {
	before(() => {
		sandbox = sinon.sandbox.create();
	});
	beforeEach(() => {
		store = new AuthStore();
		const response = { data: { token: 'foo' } };
		sandbox.stub(cookie.default, 'get');
		sandbox.stub(cookie.default, 'set');
		sandbox.stub(fetch.default, 'post').returns(Promise.resolve(response));
	});
	afterEach(() => {
		sandbox.restore();
	});

	it('should authenticate with api', () => {
		const data = { email: 'john@doe.com', password: 'foo' };

		store.authenticate(data);

		fetch.default.post.should.have.been.calledWith('/authenticate');
	});

	it('should update token when authenticated with api', () => {
		return store.authenticate().then(() => {
			expect(store.token).to.equal('foo');
		});
	});

	it('should store token in cookie when authenticated', () => {
		return store.authenticate().then(() => {
			cookie.default.set.should.have.been.called;
		});
	});

	it('should persist token in cookie when changed', () => {
		store.token = 'foo';
		cookie.default.set.should.have.been.calledWith('token', 'foo');
	});
 });
