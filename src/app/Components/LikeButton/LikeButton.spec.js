import 'Utils/TestSetup';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { LikeButton } from 'Components/LikeButton/LikeButton';

const onClickStub = sinon.spy();
const defaultProps = { storyId: 1, active: false, onClick: onClickStub };
const defaultComponent = <LikeButton {...defaultProps} />;

let component;

describe('Like button component', () => {
	beforeEach(() => {
		component = shallow(defaultComponent);
	});

	it('should show a button', () => {
		component.should.have.a.tagName('button');
	});

	it('should trigger callback on click', () => {
		const button = component.find('button');
		button.simulate('click');
		onClickStub.should.have.been.called();
	});

	it('should have an `is-active` class name when the user has liked the story', () => {
		component = shallow(<LikeButton {...defaultProps} active />);
		component.should.have.className('is_active');
	});
});
