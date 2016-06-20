import styles from './style.css';
import React, { PropTypes } from 'react';

const TitleInput = props => {
	return (
		<input
			className={styles.input}
			{...props}
		/>
	);
};

TitleInput.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default TitleInput;
