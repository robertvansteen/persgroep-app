import styles from './style.css';
import classNames from 'classnames';
import { Link } from 'react-router';
import throttle from 'lodash/throttle';
import React, { Component, PropTypes } from 'react';

class Header extends Component {

	/**
	 * The proptypes of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		fixed: PropTypes.bool,
		onMenuClick: PropTypes.func.isRequired,
	};

	/**
	 * The state of the component.
	 *
	 * @type {Object}
	 */
	state = {
		hidden: false,
	}

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
	}

	/**
	 * Invoked when the component is unmounted.
	 *
	 * @return {void}
	 */
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
	}

	/**
	 * Invoked when there is a scroll event.
	 * This function is throttled to improve performance, see ComponentDidMount.
	 *
	 * @return {void}
	 */
	onScroll = throttle(() => {
		const position = window.pageYOffset || document.documentElement.scrollTop;
		if (!this.props.fixed) return true;

		this.setState({ hidden: (position > 1) });
	}, 200);

	/**
	 * Get the class name for the component.
	 *
	 * @return {String}
	 */
	getClassName() {
		return classNames(styles.header, {
			[styles.fixed]: this.props.fixed,
			[styles.hidden]: this.state.hidden,
		});
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div className={this.getClassName()}>
				<div className={styles.wrapper}>
					<div className={styles.menu} onClick={this.props.onMenuClick}>
						<i className="icon-menu"></i>
					</div>
					<Link to="/">
						<h1 className={styles.title}>
							Persgroep
						</h1>
					</Link>
				</div>
			</div>
		);
	}
}

export default Header;
