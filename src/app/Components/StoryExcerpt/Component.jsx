import moment from 'momentjs';
import styles from './style.css';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import React, { PropTypes } from 'react';

const StoryExcerpt = props => {
	const story = props.story;

	return (
		<Link to={`/story/${story.id}`} onClick={props.onClick} className={styles.link}>
			<article className={styles.article}>
				<div className={styles.upper}>
					<div className={styles.image} style={{ backgroundImage: `url(${story.image_url})` }} />
					<div className={styles.overlay} />
					<h1 className={styles.title}>
						{story.title}
					</h1>
				</div>
				<div className={styles.lower}>
					<img className={styles.author_image} src={story.author.image_url} />
					<p className={styles.author_name}>
						{story.author.name}
					</p>
					<p className={styles.date}>
						{moment(story.created_at).format('D-M-YYYY')}
					</p>
				</div>
			</article>
		</Link>
	);
};

StoryExcerpt.propTypes = {
	onClick: PropTypes.func,
	story: PropTypes.object.isRequired,
};

export default observer(StoryExcerpt);
