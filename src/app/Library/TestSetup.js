import 'isomorphic-fetch';
import 'babel-polyfill';
import chai from 'chai';
import { jsdom } from 'jsdom';
import sinonChai from 'sinon-chai';
import enzymeChai from 'chai-enzyme';
import factory from 'fixture-factory';
import promisedChai from 'chai-as-promised';

/**
 * Set up chai & add-ons.
 */
chai.should();
chai.use(sinonChai);
chai.use(enzymeChai());
chai.use(promisedChai);

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

/**
 * Set up DOM.
 */
const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		exposedProperties.push(property);
		global[property] = document.defaultView[property];
	}
});

global.navigator = {
	userAgent: 'node.js',
};
