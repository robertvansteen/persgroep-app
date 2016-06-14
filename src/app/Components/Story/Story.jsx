import _ from 'lodash';
import moment from 'momentjs';
import styles from './story.css';
import { observer } from 'mobx-react';
import React, { Component, PropTypes } from 'react';
import LikeButton from 'Components/LikeButton/LikeButton';

export class Story extends Component {

	/**
	 * The type of the props the component expects.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		active: PropTypes.bool,
		story: PropTypes.object.isRequired,
	}

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		window.addEventListener('scroll', _.throttle(() => this.onScroll(), 200, { trailing: true }));
	}

	/**
	 * Invoked when the component will receive props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.active) {
			this.refs.element.style.transform = 'translateY(0)';
			this.refs.element.style.height = 'auto';
		}
	}

	/**
	 * Invoked when there is a scroll event.
	 * This function is throttled to improve performance, see ComponentDidMount.
	 *
	 * @return {void}
	 */
	onScroll() {
		const scrolled = window.scrollY;
		if (!this.props.active) {
			this.refs.element.style.transform = `translateY(${scrolled}px)`;
			this.refs.element.style.height = '100vh';
		}
	}

	/**
	 * Invoked when the like button is clicked.
	 *
	 * @return {void}
	 */
	onLikeButtonClick = () => {
		// TODO: Reimplement this.
	}

	/**
	 * Parse the body of the story to set the CSS modules classes on the elements.
	 *
	 * @param  {String} body
	 * @return {String}
	 */
	parseBody(body = '') {
		let parsedBody = body;

		if (!parsedBody.match(/<p(.*?)>/g)) {
			parsedBody = `<p>${parsedBody}</p>`;
		}

		parsedBody = parsedBody.replace(/<p(.*?)>/g, `<p class="${styles.body__paragraph}">`);
		parsedBody = parsedBody.replace(/<p(.*?)>(\s*?)<\/p>/g, '');


		return parsedBody;
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
							style={{ backgroundImage: `url(/images/photo.png)` }}
						></div>
						<div className={styles.overlay}></div>
						<div className={styles.header_wrapper}>
							<p className={styles.author}>{story.author.name}</p>
							<h1 className={styles.title}>{story.title}</h1>
						</div>
					</div>
					<div className={styles.main}>
						<div className={styles.date}>
							{moment(story.created_at).format('D-M-YYYY')}
						</div>
						<div
							className={styles.body}
							dangerouslySetInnerHTML={{ __html: this.parseBody(story.body) }}
						>
						</div>
						<LikeButton
							active={story.liked}
							onClick={this.onLikeButtonClick}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default observer(Story);
