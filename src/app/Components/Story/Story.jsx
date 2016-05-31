import _ from 'lodash';
import styles from './story.css';
import React, { Component, PropTypes } from 'react';

class Story extends Component {

	static propTypes = {
		active: PropTypes.bool.isRequired,
		story: PropTypes.object.isRequired,
	}

	componentDidMount() {
		window.addEventListener('scroll', _.throttle(() => this.onScroll(), 200, { trailing: true }));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active) {
			this.refs.element.style.transform = 'translateY(0)';
			this.refs.element.style.height = 'auto';
		}
	}

	onScroll() {
		const scrolled = window.scrollY;
		if (!this.props.active) {
			this.refs.element.style.transform = `translateY(${scrolled}px)`;
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
						<div
							className={styles.cover}
							style={{ backgroundImage: `url(${story.image_url})` }}
						></div>
						<div className={styles.overlay}></div>
						<h1 className={styles.title}>{story.title}</h1>
					</div>
					<div
						className={styles.body}
						dangerouslySetInnerHTML={{ __html: story.body }}
					></div>
				</div>
			</div>
		);
	}
}

export default Story;
