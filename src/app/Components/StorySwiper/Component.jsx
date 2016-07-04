import styles from './style.css';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import Slider from 'Components/Slider';
import { Iteratable } from 'Library/PropTypes';
import Story from 'Components/Story/Component';
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
	 * Invoked when the slide transition ends.
	 *
	 * @param  {Integer} nextPane
	 * @return {void}
	 */
	onSlideChange = (nextPane) => {
		window.scrollTo(0, 0);
		if (this.props.onChange) this.props.onChange(nextPane);
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
				<Slider
					ref="swiper"
					currentPane={this.props.index}
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
				</Slider>
			</div>
		);
	}
}

export default observer(StorySwiper);
