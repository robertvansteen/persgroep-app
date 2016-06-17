import 'Stylesheets/reset';
import 'Stylesheets/shared';
import DevTools from 'mobx-react-devtools';
import Header from 'Components/Header/Component';
import React, { Component, PropTypes } from 'react';

class App extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		location: PropTypes.object,
		children: PropTypes.node,
	}

	/**
	 * Invoked when the component receives new props.
	 *
	 * @return {void}
	 */
	componentWillReceiveProps() {
		window.previousLocation = this.props.location;
	}

	/**
	 * Render the devtools.
	 * This will only be done on non-production environments.
	 *
	 * @return {ReactElement|null}
	 */
	renderDevTools() {
		if (process.env.ENV === 'production') return null;

		return <DevTools />;
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div>
				<Header />
				{this.renderDevTools()}
				{this.props.children}
			</div>
		);
	}
}

export default App;
