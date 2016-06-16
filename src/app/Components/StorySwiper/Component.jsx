import styles from './style.css';
import { observer } from 'mobx-react';
import Story from 'Components/Story/Story';
import { Iteratable } from 'Library/PropTypes';
import Swiper from 'Components/Swiper/Component';
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

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {}

	/**
	 * Invoked when the component is about to receive new props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (this.props.index !== nextProps.index) {
			this.refs.swiper.slide(nextProps.index);
		}
	}

	/**
	 * Invoked when the slide transition ends.
	 *
	 * @param  {Integer} newIndex
	 * @return {void}
	 */
	onSlideChange = (newIndex) => {
		if (newIndex !== this.props.index) {
			window.scrollTo(0, 0);
			if (this.props.onChange) this.props.onChange(newIndex);
		}
	}

	/**
	 * Options for the swiper.
	 *
	 * @type {Object}
	 */
	swiperOptions = {
		cellSelector: `.${styles.slide}`,
		selectedAttraction: 0.2,
		friction: 0.8,
		prevNextButtons: false,
		pageDots: false,
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
						options={this.swiperOptions}
						onSlideChange={this.onSlideChange}
					>
						{stories.map((story, index) =>
							<Story
								className={styles.slide}
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
