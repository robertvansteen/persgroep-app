import styles from './style.css';
import Store from 'Stores/StoryStore';
import { observer } from 'mobx-react';
import { compose, mapProps } from 'recompose';
import React, { Component, PropTypes } from 'react';
import StoryExcerpt from 'Components/StoryExcerpt/Component';

export class StoryList extends Component {

	/**
	 * Define the prop types of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		stories: PropTypes.array.isRequired,
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
					{stories.map(story =>
						<StoryExcerpt
							key={story.id}
							story={story}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default compose(
	mapProps(() => ({ ...Store })),
	observer
)(StoryList);
