import styles from './style';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

const Assignment = props => {
	const { id, title, image_url } = props.assignment;

	return (
		<Link to={`/assignment/${id}`} className={styles.block}>
			<div className={styles.image} style={{ backgroundImage: `url(${image_url})` }} />
			<div className={styles.overlay} />
			<div className={styles.content}>
				<p className={styles.title}>
					{title}
				</p>
			</div>
		</Link>
	);
};

Assignment.propTypes = {
	assignment: PropTypes.object,
};

export default Assignment;
