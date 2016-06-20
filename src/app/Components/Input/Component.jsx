import omit from 'lodash/omit';
import React, { PropTypes } from 'react';
import style from './style';

/**
 * Define the component.
 */
const Input = props => {
	const inputProps = omit(props, ['label', 'touched', 'error']);

	return (
		<div className={style.wrapper}>
			<label className={style.label}>{props.label}</label>
			<input {...inputProps} className={style.input} />
			<p className={style.error}>
				{props.touched && props.error}
			</p>
		</div>
	);
};

/**
 * Define the proptypes of the component.
 *
 * @type {Object}
 */
Input.propTypes = {
	label: PropTypes.string,
	touched: PropTypes.bool,
	error: PropTypes.string,
};

export default Input;
