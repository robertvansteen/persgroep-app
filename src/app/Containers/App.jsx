import 'Stylesheets/reset';
import 'Stylesheets/shared';
import styles from './style.css';
import AuthStore from 'Stores/AuthStore';
import Menu from 'Components/Menu/Component';
import { fetchMe, refresh } from 'Sources/Auth';
import Notifications from 'Domain/Notifications';
import Header from 'Components/Header/Component';
import Spinner from 'Components/Spinner';
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
		authenticating: !!AuthStore.token,
		menuCollapsed: false,
	}

	/**
	 * Invoked when the component is mounted.
	 * When there is a token stored, we refresh it & fetch the current user.
	 * If not we proceed as guest.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		if (AuthStore.token) {
			refresh()
				.then(() =>
					fetchMe().then(() => this.setState({ authenticating: false })))
				.catch(() => this.setState({ authenticating: false }));
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

		this.scrollToTop(this.props.location, nextProps.location);
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
	 * Determine if the position of the header should be fixed.
	 * Only on the story pages this should be the case.
	 * Also, if the menu is active, it should overwrite it.
	 *
	 * @return {Boolean}
	 */
	shouldHeaderBeFixed() {
		if (this.state.menuCollapsed) return false;
		return this.props.location.pathname.includes('/story/');
	}

	/**
	 * Scroll to the top when the router changes.
	 * We do this on every page, except on a page change of the story swiper
	 * it has it's own logic for handling scroll position.
	 *
	 * @param {Object} location
	 * @param {Object} newLocation
	 * @return {void}
	 */
	scrollToTop(location, newLocation) {
		const path = location.pathname;
		const newPath = newLocation.pathname;

		if (path.includes('/story/') && newPath.includes('/story/')) return false;
		
		window.scrollTo(0, 0);
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
		if (this.state.authenticating) {
			return <Spinner />;
		}

		return (
			<div className={styles.container}>
				<Notifications />
				<Header
					fixed={this.shouldHeaderBeFixed()}
					onMenuClick={this.onMenuClick}
				/>
				<div className={styles.main}>
					{this.renderMenu()}
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;
