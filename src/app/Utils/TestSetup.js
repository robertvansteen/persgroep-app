import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
import enzymeChai from 'chai-enzyme';
import factory from 'fixture-factory';

chai.should();
chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(enzymeChai());

/**
 * Register the story as factory model.
 */
factory.register('story', {
	id: 'random.number',
	title: 'random.words',
	body: 'random.words',
	author: {
		name: 'random.words',
	},
});
