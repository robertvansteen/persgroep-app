import React from 'react';
import Home from './Home';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import StoryList from 'Components/StoryList/StoryList';

describe('Home Component', () => {
	it('renders a storylist component', () => {
		const component = shallow(<Home />);
		expect(component.find(StoryList)).to.have.length(1);
	});
});
