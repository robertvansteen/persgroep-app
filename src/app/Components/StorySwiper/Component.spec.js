import React from 'react';
import { shallow } from 'enzyme';
import factory from 'fixture-factory';
import { StorySwiper } from './Component';
import Story from 'Components/Story/Component';

/**
 * The component to be tested.
 */
let component;

/**
 * The default props.
 *
 * @type {Object}
 */
const defaultProps = {
	fetchStories: () => {},
	stories: [],
};

/**
 * Test the storylist component.
 */
describe('StorySwiper Component', () => {
	before(() => {
		component = shallow(<StorySwiper {...defaultProps} />);
	});

	it('should render the stories passed in', () => {
		const stories = factory.generate('story', 3);
		component = shallow(<StorySwiper {...defaultProps} stories={stories} />);
		component.should.have.exactly(3).descendants(Story);
	});
});
