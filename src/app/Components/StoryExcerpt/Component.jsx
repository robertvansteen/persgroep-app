import moment from 'momentjs';
import styles from './style.css';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import React, { PropTypes } from 'react';

const StoryExcerpt = props => {
	const story = props.story;

	return (
		<Link to={`/story/${story.id}`} onClick={props.onClick}>
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
		</Link>
	);
};

StoryExcerpt.propTypes = {
	onClick: PropTypes.func,
	story: PropTypes.object.isRequired,
};

export default observer(StoryExcerpt);
