import styles from './style.css';
import classNames from 'classnames';
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
		amount: PropTypes.number.isRequired,
		size: PropTypes.oneOf(['small', 'large']),
	}

	/**
	 * Define the default props for the component.
	 *
	 * @type {Object}
	 */
	static defaultProps = {
		size: 'small',
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.amount > this.props.amount) {
			this.refs.component.classList.add(styles.increase);
			setTimeout(() => this.refs.component.classList.remove(styles.increase), 2000);
		}
	}

	/**
	 * Return the class names of the component.
	 *
	 * @return {String}
	 */
	getClassNames() {
		return classNames(
			styles.component,
			styles[this.props.size],
			{ [styles.active]: this.props.active }
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
				ref="component"
				onClick={this.props.onClick}
				className={this.getClassNames()}
			>
				<span className={styles.icon}>
					<i className="icon-thumbs-up"></i>
				</span>
				<span className={styles.amount}>
					{this.props.amount}
				</span>
			</button>
		);
	}
}

export default LikeButton;
