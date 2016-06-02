import 'Utils/TestSetup';
import React from 'react';
import { shallow } from 'enzyme';
import factory from 'fixture-factory';
import Story from 'Components/Story/Story';

import { StoryList } from './StoryList';

describe('StoryList Component', () => {
	it('should render the stories passed in', () => {
		const props = {
			story: { stories: factory.generate('story', 3) },
		};
		const component = shallow(<StoryList {...props} />);
		component.should.have.exactly(3).descendants(Story);
	});
});
