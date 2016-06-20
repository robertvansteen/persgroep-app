import styles from './style';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

const Menu = (props) => {
	return (
		<nav className={styles.menu}>
			// {props.currentUser ? props.currentUser.name : null}
			<Link to="/category/1" className={styles.item}>Stories</Link>
			<Link to="/story/new" className={styles.item}>New Story</Link>
		</nav>
	);
};

Menu.propTypes = {
	currentUser: PropTypes.object,
};

export default Menu;
