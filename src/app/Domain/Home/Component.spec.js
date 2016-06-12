import React from 'react';
import Home from './Component';
import { expect } from 'chai';
import { shallow } from 'enzyme';

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
		component = shallow(<Home />);
	});
	it('renders a category list component', () => {
		expect(component.find(CategoryList)).to.have.length(1);
	});
});
