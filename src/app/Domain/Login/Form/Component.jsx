import styles from './style';
import LoginStore from './Store';
import { observer } from 'mobx-react';
import AuthStore from 'Stores/AuthStore';
import { compose, mapProps } from 'recompose';
import Input from 'Components/Input/Component';
import Button from 'Components/Button/Component';
import React, { Component, PropTypes } from 'react';

export class Login extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		errors: PropTypes.object,
		submit: PropTypes.func.isRequired,
		input: PropTypes.object.isRequired,
		updateInput: PropTypes.func.isRequired,
	}

	/**
	* Define the default props for the component.
	*
	* @type {Object}
	*/
	static defaultProps = {
		errors: {},
	}

	/**
	 * Invoked when one of the inputs is changed.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onInputChange = (event) => {
		const { name, value } = event.target;
		this.props.updateInput(name, value);
	}

	/**
	 * Invoked when an input is blurred.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onBlur = (event) => {
		this.props.input[event.target.name].touched = true;
	}

	/**
	 * Invoked when the form is submitted.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onSubmit = (event) => {
		event.preventDefault();
		this.props.submit();
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const { input, errors } = this.props;
		const { email, password } = input;

		return (
			<div className={styles.wrapper}>
				<h2 className={styles.title}>
					Login
				</h2>
				<form onSubmit={this.onSubmit} className={styles.form}>
					<Input
						label="Email"
						type="email"
						name="email"
						placeholder="email"
						onChange={this.onInputChange}
						onBlur={this.onBlur}
						error={errors.email}
						value={email.value}
						touched={email.touched}
					/>
					<Input
						label="Password"
						type="password"
						name="password"
						placeholder="password"
						onChange={this.onInputChange}
						onBlur={this.onBlur}
						error={errors.password}
						{...password}
					/>
					<div className={styles.form__actions}>
						<Button type="submit" label="Sign in" />
					</div>
				</form>
			</div>
		);
	}
}

export default compose(
	observer,
	mapProps(() => ({ ...LoginStore, errors: LoginStore.errors, token: AuthStore.token })),
	observer,
)(Login);
