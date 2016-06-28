import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from 'Components/CategoryList/Component';

/**
 * The component to be tested.
 */
let component;

/**
 * Test the categorylist component.
 */
describe('Category List Component', () => {
	it('should show the categories', () => {
		const categories = [
			{ id: '1', name: 'foo' },
			{ id: '2', name: 'bar' },
		];
		component = shallow(<CategoryList categories={categories}/>);
	});
});
