import styles from './style';
import LoginFormStore from './Store';
import { observer } from 'mobx-react';
import Button from 'Components/Button';
import React, { Component } from 'react';
import AuthStore from 'Stores/AuthStore';
import { compose, mapProps } from 'recompose';
import Input from 'Components/Input/Component';

export class Login extends Component {

	componentWillMount() {
		this.store = new LoginFormStore();
	}

	/**
	 * Invoked when one of the inputs is changed.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onInputChange = (event) => {
		const { name, value } = event.target;
		this.store.updateInput(name, value);
	}

	/**
	 * Invoked when an input is blurred.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onBlur = (event) => {
		this.store.input[event.target.name].touched = true;
	}

	/**
	 * Invoked when the form is submitted.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onSubmit = (event) => {
		event.preventDefault();
		this.store.submit();
	}

	renderLoginButton() {
		const label = this.store.submitting ? 'Signing you in...' : 'Sign in';

		return (
			<Button type="submit" label={label} />
		);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const { input, errors, errorMessage } = this.store;
		const { email, password } = input;

		return (
			<div className={styles.wrapper}>
				<h2 className={styles.title}>
					Login
				</h2>
				<p className={styles.error_message}>{errorMessage}</p>
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
						{this.renderLoginButton()}
					</div>
				</form>
			</div>
		);
	}
}

export default observer(Login);
