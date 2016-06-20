import styles from './style.css';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

class StyleButton extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		active: PropTypes.bool.isRequired,
		label: PropTypes.string.isRequired,
		style: PropTypes.string.isRequired,
		onToggle: PropTypes.func.isRequired,
	}

	onToggle = (event) => {
		this.props.onToggle(this.props.style);
		event.preventDefault();
	}

	getClassName() {
		return classNames(
			styles.button,
			styles[this.props.style.toLowerCase()],
			{ [styles.button_active]: this.props.active },
		);
	}

	render() {
		return (
			<span className={this.getClassName()} onMouseDown={this.onToggle}>
				{this.props.label}
			</span>
		);
	}
}

export default StyleButton;
