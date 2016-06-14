import fetch from 'axios';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import categories from 'Collections/Categories';

export class HomeContainer extends Component {

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div>Home</div>
		);
	}
}

export default observer(HomeContainer);
