import React from 'react';
import styles from './style.css';
import { Link } from 'react-router';

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.wrapper}>
				<Link to="/">
					<h1 className={styles.title}>
						Persgroep
					</h1>
				</Link>
			</div>
		</div>
	);
};

export default Header;
