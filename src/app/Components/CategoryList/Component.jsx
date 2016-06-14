import React from 'react';
import styles from './style';
import { Link } from 'react-router';
import { Iteratable } from 'Library/PropTypes';

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
	categories: Iteratable,
};

export default CategoryList;
