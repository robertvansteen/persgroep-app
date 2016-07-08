import styles from './style.css';
import classNames from 'classnames';
import React, { PropTypes } from 'react';

const Button = props => {
	const className = classNames(styles.base, styles[props.sort], styles[props.state]);

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
	sort: PropTypes.string,
	state: PropTypes.string,
	label: PropTypes.string.isRequired,
};

Button.defaultProps = {
	sort: 'button',
	state: 'default',
};

export default Button;
