import store from './Store';
import { observer } from 'mobx-react';
import stories from 'Collections/Stories';
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
		params: PropTypes.object.isRequired,
	}

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		fetchStory(this.props.params.id)
			.then((data) => {
				store.context = Object.keys(data.entities.stories);
			});
	}

	render() {
		return (
			<StorySwiper stories={store.stories} />
		);
	}
}

export default observer(StoryContainer);
