import 'Stylesheets/reset';
import 'Stylesheets/shared';
import DevTools from 'mobx-react-devtools';
import React, { Component, PropTypes } from 'react';

class App extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		children: PropTypes.node,
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
				{this.renderDevTools()}
				{this.props.children}
			</div>
		);
	}
}

export default App;
