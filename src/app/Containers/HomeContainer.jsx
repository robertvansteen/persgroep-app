import Home from 'Components/Home/Home';
import React, { Component } from 'react';

class HomeContainer extends Component {

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<Home {...this.props} />
		);
	}
}

export default HomeContainer;
