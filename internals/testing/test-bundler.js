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
	excerpt: 'random.words',
	body: 'random.words',
	liked: false,
	author: {
		name: 'random.words',
	},
	created_at: 'date.recent.value',
});

factory.register('category', {
	id: 'random.number',
	name: 'random.word',
});

const __karmaWebpackManifest__ = [];

// Include all .js files under `app`, except app.js, reducers.js, routes.js and
// store.js. This is for isparta code coverage
const context = require.context(
	'../../src/app',
	true,
	/^^((?!(client|server)).)*\.js$/
);

function inManifest(path) {
	return __karmaWebpackManifest__.indexOf(path) >= 0;
}

let runnable = context.keys().filter(inManifest);

// Run all tests if we didn't find any changes
if (!runnable.length) {
	runnable = context.keys();
}

runnable.forEach(context);
