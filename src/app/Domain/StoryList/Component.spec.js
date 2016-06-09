import 'Library/TestSetup';
import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { map } from 'mobx';
import factory from 'fixture-factory';
import { shallow, mount } from 'enzyme';
import Story from 'Components/Story/Story';
import { StoryList } from 'Domain/StoryList/Component';


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
	stories: map(),
};

/**
 * Create stories in a map format.

 * @param  {Integer} amount
 * @return {Map}
 */
function createStories(amount) {
	return map(
		_.keyBy(factory.generate('story', amount), 'id')
	);
}

/**
 * Test the storylist component.
 */
describe('StoryList Component', () => {
	before(() => {
		component = shallow(<StoryList {...defaultProps} />);
	});

	it('should render the stories passed in', () => {
		const stories = createStories(3);
		component = shallow(<StoryList {...defaultProps} stories={stories} />);
		component.should.have.exactly(3).descendants(Story);
	});

	it('should fetch stories on mount', () => {
		const fetchStories = sinon.spy();
		component = mount(<StoryList {...defaultProps} fetchStories={fetchStories} />);
		fetchStories.should.have.been.called;
	});
});
