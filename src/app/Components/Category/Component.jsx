import styles from './style';
import { observer } from 'mobx-react';
import React, { PropTypes } from 'react';
import StoryExcerpt from 'Components/StoryExcerpt';

const Category = (props) => {
	const category = props.category;

	if (!category) {
		return <div/>;
	}

	return (
		<section className={styles.wrapper}>
			{category.topStories.map(story =>
				<StoryExcerpt
					key={story.id}
					story={story}
					onClick={props.onClick}
				/>
			)}
		</section>
	);
};

Category.propTypes = {
	onClick: PropTypes.func,
	category: PropTypes.object.isRequired,
};

export default observer(Category);
