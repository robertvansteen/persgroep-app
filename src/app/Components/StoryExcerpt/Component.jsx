import moment from 'momentjs';
import styles from './style.css';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

class StoryExcerpt extends Component {

	/**
	 * Define the prop types of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		onClick: PropTypes.func,
		story: PropTypes.object.isRequired,
	}

	/**
	 * The initial state of the component.
	 *
	 * @type {Object}
	 */
	state = {
		full: false,
	}

	/**
	 * Invoked when the story is clicked.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onClick = (event) => {
		const el = this.refs.wrapper;
		event.preventDefault();
		this.props.onClick();
		const first = el.getBoundingClientRect();
		el.classList.add(styles.full);
		const last = el.getBoundingClientRect();
		const invert = {
			x: first.left - last.left,
			y: first.top - last.top,
			sx: first.width / last.width,
			sy: first.height / last.height,
		};
		el.style.transform =
			`translate(${invert.x}px, ${invert.y}px) scale(${invert.sx}, ${invert.sy})`;

		requestAnimationFrame(() => {
			el.classList.add(styles.transitions);
			el.style.transform = '';
		});
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const { story } = this.props;

		return (
			<div
				ref="wrapper"
				onClick={this.onClick}
				className={styles.wrapper}
			>
				<article className={styles.article}>
					<div className={styles.upper}>
						<div className={styles.image} style={{ backgroundImage: `url(${story.image_url})` }} />
						<div className={styles.overlay} />
						<h1 className={styles.title}>
							{story.title}
						</h1>
					</div>
					<div className={styles.lower}>
						<img className={styles.author_image} src={story.author.image_url} />
						<p className={styles.author_name}>
							{story.author.name}
						</p>
						<p className={styles.date}>
							{moment(story.created_at).format('D-M-YYYY')}
						</p>
					</div>
				</article>
			</div>
		);
	}
}

export default observer(StoryExcerpt);
