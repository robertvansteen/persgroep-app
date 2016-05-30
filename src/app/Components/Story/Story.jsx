import styles from './story.css';
import React, { Component, PropTypes } from 'react';

class Story extends Component {

	static propTypes = {
		active: PropTypes.bool.isRequired,
		story: PropTypes.string.isRequired,
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active) {
			this.refs.element.style.top = 0;
			this.refs.element.style.height = 'auto';
		}
	}

	onScroll() {
		const scrolled = window.scrollY;
		if (!this.props.active) {
			this.refs.element.style.top = `${scrolled}px`;
			this.refs.element.style.height = '100vh';
		}
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const story = this.props.story;

		return (
			<div className={styles.wrapper}>
				<div ref="element" className={styles.element}>
					<div className={styles.header}>
						<div className={styles.cover} style={{ backgroundImage: `url(https://unsplash.it/1024/1024?image=${story.id * 4})` }}></div>
						<div className={styles.overlay}></div>
						<h1 className={styles.title}>{story.title}</h1>
					</div>
					<div className={styles.body}>
						<p>{story.body}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Story;
