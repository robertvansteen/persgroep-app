import styles from './style';
import React, { PropTypes } from 'react';

const Assignment = props => {
	const { title, image_url } = props.assignment;

	return (
		<div className={styles.block}>
			<div className={styles.image} style={{ backgroundImage: `url(${image_url})` }} />
			<div className={styles.overlay} />
			<div className={styles.content}>
				<p className={styles.title}>
					{title}
				</p>
			</div>
		</div>
	);
};

Assignment.propTypes = {
	assignment: PropTypes.object,
};

export default Assignment;
