import 'Utils/TestSetup';
import React from 'react';
import { shallow } from 'enzyme';
import LikeButton from 'Components/LikeButton/LikeButton';

import { Story } from 'Components/Story/Story';

const story = {
	id: '1',
	title: 'Foo',
	body: 'body',
	author: {
		name: 'Baz',
	},
	created_at: '2016-06-03 07:57:17',
};

let component;

describe('Story component', () => {
	before(() => {
		component = shallow(<Story story={story}/>);
	});

	it('should show the title of the story', () => {
		component.should.contain('Foo');
	});

	it('should show the body of the story', () => {
		const html = component.html();
		html.should.contain('body');
	});

	it('should show the author of the story', () => {
		component.should.contain('Baz');
	});

	it('should show the date of the story', () => {
		component.should.contain('3-6-2016');
	});

	it('should have a like button component', () => {
		component.should.have.descendants(LikeButton);
	});
});
