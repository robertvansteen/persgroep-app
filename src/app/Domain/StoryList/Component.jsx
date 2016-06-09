import Swiper from 'react-swipe';
import styles from './style.css';
import Store from 'Stores/StoryStore';
import { observer } from 'mobx-react';
import Story from 'Components/Story/Story';
import { compose, mapProps } from 'recompose';
import React, { Component, PropTypes } from 'react';

export class StoryList extends Component {

	/**
	 * Define the prop types of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		stories: PropTypes.object.isRequired,
		fetchStories: PropTypes.func.isRequired,
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
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		this.props.fetchStories();
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
						key={stories.size}
					>
						{stories.values().map((story, index) =>
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

export default compose(
	mapProps(() => ({ ...Store })),
	observer
)(StoryList);
