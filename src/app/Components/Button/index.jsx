import styles from './style.css';
import classNames from 'classnames';
import React, { PropTypes } from 'react';

const Button = props => {
	const className = classNames(styles.base, styles[props.type], styles[props.state]);

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
	state: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string.isRequired,
};

Button.defaultProps = {
	state: 'default',
	type: 'button',
};

export default Button;
