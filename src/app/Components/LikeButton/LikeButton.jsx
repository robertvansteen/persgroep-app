import classNames from 'classNames';
import styles from './like-button.css';
import React, { Component, PropTypes } from 'react';

export class LikeButton extends Component {

	/**
	 * Define the proptypes of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		active: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
		storyId: PropTypes.string.isRequired,
	}

	/**
	 * Return the class names of the component.
	 *
	 * @return {String}
	 */
	getClassNames() {
		return classNames({
			[styles.isActive]: true,
		});
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<button
				onClick={this.props.onClick}
				className={this.getClassNames()}
			>
				Goed verhaal
			</button>
		);
	}
}

export default LikeButton;
