import 'babel-polyfill';

import sinon from 'sinon';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import factory from 'fixture-factory';

chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

/**
 * Register the story as factory model.
 */
factory.register('story', {
	id: 'random.number',
	title: 'random.words',
	body: 'random.words',
	liked: false,
	author: {
		name: 'random.words',
	},
});

// Include all .js files under `app`, except app.js, reducers.js, routes.js and
// store.js. This is for isparta code coverage
const context = require.context(
	'../../src/app',
	true,
	/^^((?!(client|server)).)*\.js$/
);
context.keys().forEach(context);
