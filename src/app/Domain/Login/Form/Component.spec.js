import 'Library/TestSetup';
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { Login } from './Component';
import Button from 'Components/Input/Component';

/**
 * The component to be tested.
 */
let component;

/**
 * Define the default props for the test component.
 *
 * @type {Object}
 */
const defaultProps = {
	input: {
		email: {},
		password: {},
	},
	errors: {},
	submit: () => {},
	updateInput: () => {},
};


/**
 * Test the login component.
 */
describe('Login Component', () => {
	beforeEach(() => {
		component = shallow(<Login {...defaultProps}/>);
	});

	it('should contain an email input field', () => {
		component.find({ name: 'email' }).should.be.present();
	});

	it('should contain an password input field', () => {
		component.find({ name: 'password' }).should.be.present();
	});

	it('should contain an submit button', () => {
		component.find(Button).should.be.present();
	});

	it('should call updateInput prop method on input change', () => {
		const updateInput = sinon.spy();
		component = mount(<Login {...defaultProps} updateInput={updateInput} />);

		const input = component.find('input[name="email"]');
		input.node.value = 'foo';
		input.simulate('change');

		updateInput.should.have.been.calledWith('email', 'foo');
	});

	it('should call submit prop method on form submit', () => {
		const submit = sinon.spy();
		component = mount(<Login {...defaultProps} submit={submit} />);

		const form = component.find('form');
		form.simulate('submit');

		submit.should.have.been.called;
	});

	it('should not show errors if the input has not been touched', () => {
		const props = { ...defaultProps,
			errors: { email: 'error' },
			input: { ...defaultProps.input, email: { value: 'foo', touched: false } },
		};
		component = shallow(<Login {...props} />);
		expect(component.contains('error')).to.equal(false);
	});

	it('should show errors if the input has been touched', () => {
		const props = { ...defaultProps,
			errors: { email: 'error' },
			input: { ...defaultProps.input, email: { value: 'foo', touched: true } },
		};
		component = shallow(<Login {...props} />);
		component.find({ name: 'email' }).should.have.prop('error', 'error');
	});
});
