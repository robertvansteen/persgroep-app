import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { HomeContainer } from './Container';
import CategoryList from 'Components/CategoryList/Component';

/**
 * The component to be tested.
 */
let component;

/**
 * Test the home component.
 */
describe('Home Component', () => {
	beforeEach(() => {
		component = shallow(<HomeContainer />);
	});
});
