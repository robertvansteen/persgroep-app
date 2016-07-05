import styles from './style';
import { Link } from 'react-router';
import classNames from 'classnames';
import React, { PropTypes } from 'react';

const StoryLink = props => {
	const { story, direction } = props;
	const className = classNames(styles.component, styles[props.direction]);

	return (
		<Link to={`/story/${story.id}`} className={className}>
			<span className={styles.text}>
				<span className={styles.label}>Next Story</span>
				<span className={styles.title}>{story.title}</span>
			</span>
			<span className={styles.icon}>
				<i className={`icon-arrow-${direction}`}></i>
			</span>
		</Link>
	);
};

StoryLink.propTypes = {
	className: PropTypes.string,
	story: PropTypes.object.isRequired,
	direction: PropTypes.oneOf(['left', 'right']),
};

export default StoryLink;
