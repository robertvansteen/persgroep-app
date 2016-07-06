import moment from 'momentjs';
import styles from './style.css';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import throttle from 'lodash/throttle';
import StoryLink from 'Components/StoryLink';
import LikeButton from 'Components/LikeButton';
import React, { Component, PropTypes } from 'react';

export class Story extends Component {

	/**
	 * The type of the props the component expects.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		active: PropTypes.bool,
		visible: PropTypes.bool,
		className: PropTypes.string,
		prevStory: PropTypes.object,
		nextStory: PropTypes.object,
		story: PropTypes.object.isRequired,
	}

	/**
	 * Construct a new component.
	 *
	 * @param  {Object} props
	 * @param  {Object} context
	 * @return {void}
	 */
	constructor(props, context) {
		super(props, context);
		this.onScroll = throttle(this.onScroll, 200, { trailing: true });
	}

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
		window.addEventListener('orientationchange', this.onOrientationChange);
		this.setHeight();
	}

	/**
	 * Invoked when the component will receive props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.visible) {
			this.refs.element.style.transform = 'translateY(0)';
			this.refs.element.style.height = 'auto';
		}
	}

	/**
	 * Invoked when the component is unmounted.
	 *
	 * @return {void}
	 */
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
		window.removeEventListener('orientationchange', this.onOrientationChange);
	}

	/**
	 * Invoked when there is a scroll event.
	 * This function is throttled to improve performance, see ComponentDidMount.
	 *
	 * @return {void}
	 */
	onScroll = () => {
		const scrolled = window.scrollY;
		if (!this.props.visible) {
			requestAnimationFrame(() => {
				this.refs.element.style.transform = `translateY(${scrolled}px)`;
				this.refs.element.style.height = '100vh';
			});
		}
	}

	/**
	 * Invoked when the orientation is changed.
	 * Because we can't rely on the window height after an orientation change,
	 * because the system still needs some time to resize everything we set up
	 * a once event listener for the resize & use that to set the height correctly.
	 *
	 * @return {void}
	 */
	onOrientationChange = () => {
		const resizeListener = () => {
			this.setHeight();
			window.removeEventListener('resize', resizeListener);
		};
		window.addEventListener('resize', resizeListener);
	}

	/**
	 * Invoked when the like button is clicked.
	 *
	 * @return {void}
	 */
	onLikeButtonClick = () => {
		this.props.story.toggleLike();
	}

	/**
	 * Set a fixed height on the header.
	 * We do this because Android causes a jump when scrolling when using 100vh.
	 * So we do this manually with JavaScript by grabbing the window innerheight.
	 *
	 * @return {void}
	 */
	setHeight() {
		const height = window.innerHeight;
		this.refs.header.style.height = `${height}px`;
	}

	/**
	 * Get the class name for the component.
	 *
	 * @return {String}
	 */
	getClassName() {
		return classNames({
			[styles.wrapper]: true,
			[this.props.className]: true,
		});
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
		// parsedBody = parsedBody.replace(/<p(.*?)>(\s*?)<\/p>/g, '');

		return parsedBody;
	}

	/**
	 * Render the like button component.
	 *
	 * @return {ReactElement}
	 */
	renderLikeButton() {
		const { story } = this.props;

		return (
			<div className={styles.actions}>
				<LikeButton
					size="large"
					active={story.liked}
					amount={story.like_count}
					onClick={this.onLikeButtonClick}
				/>
			</div>
		);
	}

	renderNavigation() {
		const next = this.props.nextStory
			? <StoryLink direction="right" story={this.props.nextStory} />
			: null;

		const prev = this.props.prevStory
			? <StoryLink direction="left" story={this.props.prevStory} />
			: null;

		return (
			<div className={styles.navigation}>
				{prev}
				{next}
			</div>
		);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const story = this.props.story;
		const body = this.parseBody(story.body);

		return (
			<div className={this.getClassName()}>
				<div ref="element" className={styles.element}>
					<div className={styles.header} ref="header">
						<div
							className={styles.cover}
							style={{ backgroundImage: `url(${story.image_url})` }}
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
							ref="body"
							className={styles.body}
							dangerouslySetInnerHTML={{ __html: body }}
						>
						</div>
						{this.renderLikeButton()}
						{this.renderNavigation()}
					</div>
				</div>
			</div>
		);
	}
}

export default observer(Story);
