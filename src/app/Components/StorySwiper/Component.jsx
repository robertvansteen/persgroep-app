import styles from './style.css';
import { Link } from 'react-router';
import Story from 'Components/Story';
import { observer } from 'mobx-react';
import Slider from 'Components/Slider';
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
		previousLocation: PropTypes.object,
	}

	/**
	 * Render the back button.
	 *
	 * @return {ReactElement|null}
	 */
	renderBackButton() {
		if (!this.props.previousLocation) return null;

		return (
			<Link
				className={styles.backButton}
				to={this.props.previousLocation.pathname}
			>
				<i className="icon-arrow-back"></i>
			</Link>
		);
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
				{this.renderBackButton()}
				<Slider
					ref="swiper"
					currentPane={this.props.index}
					onSlideChange={this.props.onChange}
				>
					{stories.map((story, index) =>
						<Story
							story={story}
							key={story.id}
							className={styles.slide}
							nextStory={stories[index + 1]}
							active={this.props.index === index}
						/>
					)}
				</Slider>
			</div>
		);
	}
}

export default observer(StorySwiper);
