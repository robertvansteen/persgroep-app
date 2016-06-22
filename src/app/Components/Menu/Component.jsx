import styles from './style';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

class Menu extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		currentUser: PropTypes.object,
	}

	/**
	 * Render the user data in the menu.
	 *
	 * @return {ReactElement}
	 */
	renderUser() {
		return (
			<div>
				<div className={styles.user}>{this.props.currentUser.name}</div>
				<Link to="/logout" className={styles.item}>Logout</Link>
			</div>
		);
	}

	/**
	 * Render the guest links.
	 *
	 * @return {ReactElement}
	 */
	renderGuest() {
		return (
			<div>
				<Link to="/login" className={styles.item}>Login</Link>
			</div>
		);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const { currentUser } = this.props;

		return (
			<nav className={styles.menu}>
				<Link to="/category/1" className={styles.item}>Stories</Link>
				<Link to="/story/new" className={styles.item}>New Story</Link>
				{currentUser ? <Link to="/assignments" className={styles.item}>Opdrachten</Link> : null}
				<hr className={styles.divider} />
				{currentUser
					? this.renderUser()
					: this.renderGuest()
				}
			</nav>
		);
	}
}

export default Menu;
