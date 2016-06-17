import sinon from 'sinon';
import * as normalizr from 'normalizr';
import * as users from 'Collections/Users';
import * as stories from 'Collections/Stories';
import * as categories from 'Collections/Categories';

/**
 * The source module.
 */
let source;

/**
 * Sinon spy sandbox.
 */
let sandbox;

/**
 * Test the story source.
 */
describe('Story source', () => {
	before(() => {
		sandbox = sinon.sandbox.create();
	});
	beforeEach(() => {
		sandbox.spy(normalizr, 'normalize');
		sandbox.spy(stories.default, 'addCollection');
		sandbox.spy(users.default, 'addCollection');
		sandbox.spy(categories.default, 'addCollection');
	});
	afterEach(() => {
		sandbox.restore();
	});
	it('should fetch a story by it\'s id', () => {
		const data = {
			data: {
				story: {},
			},
		};

		const stubs = {
			axios: { get: sinon.stub().returns(Promise.resolve(data)) },
		};

		source = require('inject!./Stories')(stubs);

		return source.fetchStory('1').then(() => {
			normalizr.normalize.should.have.been.called;
			users.default.addCollection.should.have.been.calledOnce;
			stories.default.addCollection.should.have.been.calledOnce;
		});
	});

	it('should fetch stories by category', () => {
		const data = {
			data: {
				entities: {},
			},
		};

		const stubs = {
			axios: { get: sinon.stub().returns(Promise.resolve(data)) },
		};

		source = require('inject!./Stories')(stubs);

		return source.fetchStoriesByCategory('1').then(() => {
			normalizr.normalize.should.have.been.calledOnce;
			users.default.addCollection.should.have.been.calledOnce;
			stories.default.addCollection.should.have.been.calledOnce;
			categories.default.addCollection.should.have.been.calledOnce;
		});
	});
});
