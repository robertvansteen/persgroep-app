import classNames from 'classnames';
import styles from './like-button.css';
import React, { Component, PropTypes } from 'react';

export class LikeButton extends Component {

	/**
	 * Define the proptypes of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		active: PropTypes.bool,
		onClick: PropTypes.func.isRequired,
	}

	/**
	 * Return the class names of the component.
	 *
	 * @return {String}
	 */
	getClassNames() {
		return classNames(
			[styles.wrapper],
			{ [styles.is_active]: this.props.active }
		);
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
				<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="51.418 3259.486 24.874 24.069"><g id="noun_154797_cc"><g id="group"><path id="path" d="M51.418 3269.41v13.98h5.558v-13.98z"/></g><g id="group-2" data-name="group"><path id="path-3" data-name="path" d="M74.2 3277.23c-.227.013-.23 0 0 0a1.032 1.032 0 0 0 .937-.372c2.407-2.944.012-3.288-.913-3.146-.273.014-.28-.007 0 0a2.762 2.762 0 0 0 1.234-.283 2.082 2.082 0 0 0 .625-.943 4.18 4.18 0 0 0 .2-1.2 1.652 1.652 0 0 0-1.762-1.7H68.82a1.81 1.81 0 0 1-1.737-1.8c0-.93 1.237-2.94 1.34-5.19.16-3.468-3.424-3.1-3.424-3.1s-.546.243-.546.63v2.16a6.894 6.894 0 0 1-1.538 3.783 26.922 26.922 0 0 1-2.37 2.974 4.407 4.407 0 0 1-2.443 1.285v12.448a9.82 9.82 0 0 0 3.97.776h8.882c.117 0 2.43.01 3.06-1.707.518-1.14-.46-1.19-.784-1.22-.28.014-.267-.023 0 0 .316-.016 1.977.212 2.284-2.495.09-.8-.798-.89-1.31-.9z"/><path id="path-4" data-name="path" d="M73.747 3273.717s.2.007.476-.007c-.28-.005-.476.007-.476.007z"/><path id="path-5" data-name="path" d="M73.807 3277.24s.166 0 .394-.008c-.23-.005-.393.01-.393.01z"/><path id="path-6" data-name="path" d="M72.726 3280.63s.223.012.5 0a2.85 2.85 0 0 0-.5 0z"/></g></g></svg>
				<span className={styles.text}>Goed verhaal</span>
			</button>
		);
	}
}

export default LikeButton;
