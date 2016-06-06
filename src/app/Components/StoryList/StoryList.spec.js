import 'Utils/TestSetup';
import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { map } from 'mobx';
import { mount, shallow } from 'enzyme';
import factory from 'fixture-factory';
import Story from 'Components/Story/Story';

const storeStub = {
	story: {
		fetchStories: sinon.stub(),
	},
};

let StoryList;
let component;

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
		StoryList = require('inject!Components/StoryList/StoryList')({
			'Stores/MainStore': storeStub,
		}).StoryList;
	});

	it('should render the stories passed in', () => {
		const stories = createStories(3);
		component = shallow(<StoryList stories={stories} />);
		component.should.have.exactly(3).descendants(Story);
	});

	it('should fetch stories on mount', () => {
		const stories = createStories(3);
		component = mount(<StoryList stories={stories} />);
		storeStub.story.fetchStories.should.have.been.called();
	});
});
