import styles from './style.css';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

const Header = props => {
	return (
		<div className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.menu} onClick={props.onMenuClick}>
					<i className="icon-menu"></i>
				</div>
				<Link to="/">
					<h1 className={styles.title}>
						Persgroep
					</h1>
				</Link>
			</div>
		</div>
	);
};

Header.propTypes = {
	onMenuClick: PropTypes.func.isRequired,
};

export default Header;
