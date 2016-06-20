import React from 'react';
import { shallow } from 'enzyme';
import Category from './Component';
import factory from 'fixture-factory';
import StoryExcerpt from 'Components/StoryExcerpt/Component';

/**
 * The default props.
 *
 * @type {Object}
 */
const defaultProps = {
	category: factory.generateOne('category', {
		name: 'foo',
		topStories: [factory.generateOne('story'), 3],
	}),
};

/**
 * The component to be tested.
 */
let component;

/**
 * Test the category component.
 */
describe('Category component', () => {
	beforeEach(() => {
		component = shallow(<Category {...defaultProps} />);
	});
	it('should render the category name', () => {
		component.should.contain('foo');
	});
	it('should render the excerpt of the stories passed in', () => {
		component.should.have.exactly(3).descendants(StoryExcerpt);
	});
});
