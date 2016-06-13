import styles from './style';
import { observer } from 'mobx-react';
import React, { PropTypes } from 'react';
import StoryExcerpt from 'Components/StoryExcerpt/Component';

const Category = (props) => {
	const { stories, category } = props;

	return (
		<section className={styles.wrapper}>
			<h1 className={styles.title}>
				{category.name}
			</h1>
			<ul className={styles.list}>
				{stories.map(story =>
					<StoryExcerpt key={story.id} story={story} />
				)}
			</ul>
		</section>
	);
};

Category.propTypes = {
	stories: PropTypes.array.isRequired,
	category: PropTypes.object.isRequired,
};

export default observer(Category);
