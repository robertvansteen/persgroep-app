import styles from './style.css';
import classNames from 'classnames';
import React, { PropTypes } from 'react';

const Button = props => {
	const className = classNames(styles.base, styles[props.type]);

	return (
		<button
			{...props}
			className={className}
		>
			{props.label}
		</button>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string.isRequired,
};

Button.defaultProps = {
	type: 'button',
};

export default Button;
