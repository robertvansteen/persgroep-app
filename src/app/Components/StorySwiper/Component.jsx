import Swiper from 'react-swipe';
import styles from './style.css';
import { observer } from 'mobx-react';
import Story from 'Components/Story/Story';
import { Iteratable } from 'Library/PropTypes';
import React, { Component, PropTypes } from 'react';

export class StorySwiper extends Component {

	/**
	 * Define the prop types of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		stories: Iteratable,
		index: PropTypes.number,
		onChange: PropTypes.func,
	}

	state = {
		dragging: false,
	}

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		if (this.props.index) {
			this.refs.swiper.slide(this.props.index, 0);
		}
	}

	/**
	 * Invoked when the component is about to receive new props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (this.props.index !== nextProps.index) {
			this.refs.swiper.slide(nextProps.index, 0);
		}
	}

	onDrag = () => {
		this.setState({ dragging: true });
	}

	/**
	 * Invoked when the slide transition ends.
	 *
	 * @param  {Integer} newIndex
	 * @return {void}
	 */
	onTransitionEnd = (newIndex) => {
		if (newIndex !== this.props.index) {
			window.scrollTo(0, 0);
			if (this.props.onChange) this.props.onChange(newIndex);
			this.setState({ dragging: false });
		}
	}

	/**
	 * Options for the swiper.
	 *
	 * @type {Object}
	 */
	swipeOptions = {
		continuous: false,
		disableScroll: this.state.dragging,
		callback: this.onDrag,
		transitionEnd: this.onTransitionEnd,
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const stories = this.props.stories;

		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<Swiper
						ref="swiper"
						className={styles.swiper}
						swipeOptions={this.swipeOptions}
						key={stories.length}
					>
						{stories.map((story, index) =>
							<Story
								key={story.id}
								story={story}
								active={this.props.index === index}
							/>
						)}
					</Swiper>
				</div>
			</div>
		);
	}
}

export default observer(StorySwiper);
