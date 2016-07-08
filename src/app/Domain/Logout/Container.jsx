import { compose } from 'recompose';
import AuthStore from 'Stores/AuthStore';
import { withRouter } from 'react-router';
import Spinner from 'Components/Spinner';
import React, { Component, PropTypes } from 'react';

class Logout extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		router: PropTypes.object.isRequired,
	}

	/**
	 * Invoked when the component mounts.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		AuthStore.token = null;
		AuthStore.user = null;
		setTimeout(() => this.props.router.push('/'), 1000);
	}

	/**
	 * Render the component.
	 *
	 * @return {void}
	 */
	render() {
		return (
			<Spinner />
		);
	}
}

export default compose(
	withRouter,
)(Logout);
