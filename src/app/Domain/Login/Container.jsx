import { observer } from 'mobx-react';
import { fetchMe } from 'Sources/Auth';
import AuthStore from 'Stores/AuthStore';
import LoginForm from './Form/Component';
import { compose, mapProps } from 'recompose';
import React, { Component, PropTypes } from 'react';

class FormContainer extends Component {
	/**
	 * Define the context types of the component.
	 *
	 * @type {Object}
	 */
	static contextTypes = {
		router: PropTypes.object,
	}

	/**
	 * Invoked when the component receives new props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.token) {
			fetchMe().then(() => this.context.router.push('/'));
		}
	}

	render() {
		return (
			<LoginForm />
		);
	}
}

export default compose(
	observer,
	mapProps(() => ({ token: AuthStore.token })),
)(FormContainer);
