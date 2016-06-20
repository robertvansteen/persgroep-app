import 'Stylesheets/reset';
import 'Stylesheets/shared';
import styles from './style.css';
import { fetchMe } from 'Sources/Auth';
import AuthStore from 'Stores/AuthStore';
import DevTools from 'mobx-react-devtools';
import Menu from 'Components/Menu/Component';
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
	 * The state of the component.
	 *
	 * @type {Object}
	 */
	state = {
		menuCollapsed: false,
	}

	componentDidMount() {
		if (AuthStore.token) {
			fetchMe().then(response => AuthStore.user = response.data.user);
		}
	}

	/**
	 * Invoked when the component receives new props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		window.previousLocation = this.props.location;

		if (nextProps.location !== this.props.location) {
			this.setState({ menuCollapsed: false });
		}
	}

	/**
	 * If the menu is clicked, toggle it.
	 *
	 * @return {void}
	 */
	onMenuClick = () => {
		this.setState({ menuCollapsed: !this.state.menuCollapsed });
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
	 * Render the menu.
	 *
	 * @return {ReactElement|null}
	 */
	renderMenu() {
		if (!this.state.menuCollapsed) return null;

		return (
			<Menu currentUser={AuthStore.user} />
		);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div className={styles.container}>
				{this.renderDevTools()}

				<Header onMenuClick={this.onMenuClick} />
				<div className={styles.main}>
					{this.renderMenu()}
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;
