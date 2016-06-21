import store from './Store';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { fetchStory } from 'Sources/Stories';
import { isBrowser } from 'Library/Utilities';
import React, { Component, PropTypes } from 'react';
import StorySwiper from 'Components/StorySwiper/Component';

class StoryContainer extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		router: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired,
	}

	/**
	 * The index of the current story.
	 *
	 * @type {Object}
	 */
	state = {
		index: 0,
	}

	/**
	 * Invoked when the component will mount.
	 *
	 * @return {void}
	 */
	componentWillMount() {
		if (isBrowser() && window.previousLocation) {
			this.setState({ previousLocation: window.previousLocation });
		}

		const initialIndex = this.getIndex(this.props.params.id);
		this.setState({ index: initialIndex >= 0 ? initialIndex : 0 });
	}


	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		fetchStory(this.props.params.id)
			.then((data) => {
				if (store.context.length < 1) {
					const related = data.entities.stories[data.result].related;
					store.context = [data.result, ...related];
				}
			});
	}

	/**
	 * Component is about to receive new props.
	 *
	 * @param  {Object} newProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id !== this.props.params.id) {
			this.setState({ index: this.getIndex(nextProps.params.id) });
		}
	}

	/**
	 * Invoked when the story is changed via the swiper.
	 *
	 * @param  {Object} newIndex
	 * @return {void}
	 */
	onChange = (newIndex) => {
		const story = store.stories[newIndex];
		this.props.router.push({ pathname: `/story/${story.id}` });
		this.setState({ index: newIndex });
	}

	/**
	 * Get the index of the provided story.
	 *
	 * @return {Integer}
	 */
	getIndex(id) {
		return store.stories.findIndex(story => story.id === id);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<StorySwiper
				onChange={this.onChange}
				index={this.state.index}
				stories={store.stories}
				previousLocation={this.state.previousLocation}
			/>
		);
	}
}

export default compose(
	withRouter,
	observer
)(StoryContainer);
