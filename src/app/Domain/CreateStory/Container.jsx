import { compose } from 'recompose';
import Editor from 'Components/Editor';
import { withRouter } from 'react-router';
import StoryStore from 'Domain/Story/Store';
import { publishStory } from 'Sources/Stories';
import React, { Component, PropTypes } from 'react';

class CreateStory extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		router: PropTypes.object,
	}

	/**
	 * Invoked when the story is saved.
	 *
	 * @param  {Object} data
	 * @return {void}
	 */
	onSave = (data, files) => {
		publishStory(data, files)
			.then(response => {
				StoryStore.context = [];
				const id = response.data.story.id;
				this.props.router.push(`/story/${id}`);
			});
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div>
				<Editor
					onSave={this.onSave}
				/>
			</div>
		);
	}
}

export default compose(
	withRouter,
)(CreateStory);
