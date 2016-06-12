import styles from './style';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

const CategoryList = props => {
	return (
		<ul className={styles.list}>
			{props.categories.map(category =>
				<li key={category.id} className={styles.item}>
					<Link to={`/category/${category.id}`} className={styles.item__link}>
						{category.name}
					</Link>
				</li>
			)}
		</ul>
	);
};

CategoryList.propTypes = {
	categories: PropTypes.array.isRequired,
};

export default CategoryList;
