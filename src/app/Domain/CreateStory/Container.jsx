import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { publishStory } from 'Sources/Stories';
import Editor from 'Components/Editor/Component';
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
	onSave = (data) => {
		publishStory(data)
			.then(response => {
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
