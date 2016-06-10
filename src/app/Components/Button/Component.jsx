import styles from './style.css';
import React, { PropTypes } from 'react';

const Button = props => {
	return (
		<button
			{...props}
			className={styles.button}
		>
			{props.label}
		</button>
	);
};

Button.propTypes = {
	label: PropTypes.string.isRequired,
};

export default Button;
