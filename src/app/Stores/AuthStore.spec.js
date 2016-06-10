import 'Library/TestSetup';
import sinon from 'sinon';
import { expect } from 'chai';

/**
 * The instance of the store we are testing.
 */
let store;

/**
 * Stub all the things.
 *
 * @type {Object}
 */
const stubs = {
	axios: {
		post: sinon.stub().returns(Promise.resolve()),
	},
	'js-cookie': {
		set: sinon.stub(),
	},
};

/**
 * Thest the auth store.
 */
describe('Auth Store', () => {
	beforeEach(() => {
		store = require('inject!./AuthStore')({}).AuthStore;
	});

	it('should authenticate with api', () => {
		const data = { email: 'john@doe.com', password: 'foo' };
		const postStub = sinon.stub().returns({ then: () => {} });
		store = require('inject!./AuthStore')({ axios: { post: postStub } }).AuthStore;

		store.authenticate(data);

		postStub.should.have.been.calledWith('/authenticate', data);
	});

	it('should update token when authenticated with api', () => {
		const response = { data: { token: 'foo' } };
		const postStub = sinon.stub().returns(Promise.resolve(response));
		store = require('inject!./AuthStore')({ ...stubs,
			axios: { post: postStub },
		}).AuthStore;

		return store.authenticate().then(() => {
			expect(store.token).to.equal('foo');
		});
	});

	it('should store token in cookie when authenticated', () => {
		const response = { data: { token: 'foo' } };
		const setCookieStub = sinon.spy();
		const postStub = sinon.stub().returns(Promise.resolve(response));
		store = require('inject!./AuthStore')({ ...stubs,
			'js-cookie': { set: setCookieStub },
			axios: { post: postStub },
		}).AuthStore;

		return store.authenticate().then(() => {
			setCookieStub.should.have.been.called;
		});
	});
 });
