import store from './Store';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { fetchStory } from 'Sources/Stories';
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

	componentWillReceiveProps(nextProps) {
		console.log('Component will receive props!');
		console.log('New id param', nextProps.params.id);
		if (nextProps.params.id !== this.props.params.id) {
			this.setState({ index: this.getIndex(nextProps.params.id) });
		}
	}

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

	render() {
		return (
			<StorySwiper
				onChange={this.onChange}
				index={this.state.index}
				stories={store.stories}
			/>
		);
	}
}

export default compose(
	withRouter,
	observer
)(StoryContainer);
