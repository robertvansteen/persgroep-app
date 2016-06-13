import React from 'react';
import { shallow } from 'enzyme';
import factory from 'fixture-factory';
import StoryExcerpt from './Component';

/**
 * Generated story.
 */
const story = factory.generateOne('story', {
	title: 'foo',
	excerpt: 'bar',
	created_at: '2016-01-01 12:00:00',
});

/**
 * The component to be tested.
 */
let component;

/**
 * Test the story excerpt component.
 */
describe('StoryExcerpt Component', () => {
	beforeEach(() => {
		component = shallow(<StoryExcerpt story={story} />);
	});
	it('Should render the title of the story', () => {
		component.should.contain('foo');
	});
	it('Should render the date of the story', () => {
		component.should.contain('1-1-2016');
	});
	it('Should render the excerpt of the story', () => {
		component.should.contain('bar');
	});
});
