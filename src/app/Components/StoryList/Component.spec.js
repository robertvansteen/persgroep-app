import _ from 'lodash';
import React from 'react';
import { map } from 'mobx';
import { shallow } from 'enzyme';
import factory from 'fixture-factory';
import { StoryList } from 'Components/StoryList/Component';
import StoryExcerpt from 'Components/StoryExcerpt/Component';

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
	stories: [],
};

/**
 * Test the storylist component.
 */
describe('StoryList Component', () => {
	before(() => {
		component = shallow(<StoryList {...defaultProps} />);
	});

	it('should render the stories passed in', () => {
		const stories = factory.generate('story', 3);
		component = shallow(<StoryList {...defaultProps} stories={stories} />);
		component.should.have.exactly(3).descendants(StoryExcerpt);
	});
});
