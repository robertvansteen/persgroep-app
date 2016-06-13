import moment from 'momentjs';
import styles from './style.css';
import { observer } from 'mobx-react';
import React, { PropTypes } from 'react';

const StoryExcerpt = props => {
	const story = props.story;

	return (
		<article className={styles.article}>
			<p className={styles.date}>
				{moment(story.created_at).format('D-M-YYYY')}
			</p>
			<h1 className={styles.title}>
				{story.title}
			</h1>
			<p className={styles.body}>
				{story.excerpt}
			</p>
		</article>
	);
};

StoryExcerpt.propTypes = {
	story: PropTypes.object.isRequired,
};

export default observer(StoryExcerpt);
