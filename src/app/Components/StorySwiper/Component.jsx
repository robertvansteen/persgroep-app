import Swiper from 'react-swipe';
import styles from './style.css';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import Story from 'Components/Story/Story';
import { Iteratable } from 'Library/PropTypes';

export class StorySwiper extends Component {

	/**
	 * Define the prop types of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		stories: Iteratable,
	}

	/**
	 * State of the component.
	 *
	 * @type {Object}
	 */
	state = {
		active: 0,
	}

	/**
	 * Invoked when the slide transition ends.
	 *
	 * @param  {Integer} newIndex
	 * @return {void}
	 */
	onTransitionEnd = (newIndex) => {
		if (newIndex !== this.state.active) {
			window.scrollTo(0, 0);
		}

		this.setState({ active: newIndex });
	}

	/**
	 * Options for the swiper.
	 *
	 * @type {Object}
	 */
	swipeOptions = {
		continuous: false,
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
						className={styles.swiper}
						swipeOptions={this.swipeOptions}
						key={stories.length}
					>
						{stories.map((story, index) =>
							<Story
								key={story.id}
								story={story}
								active={this.state.active === index}
							/>
						)}
					</Swiper>
				</div>
			</div>
		);
	}
}

export default observer(StorySwiper);
