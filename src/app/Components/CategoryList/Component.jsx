import styles from './style';
import classNames from 'classnames';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { Iteratable } from 'Library/PropTypes';

const Item = props => {
	const className = classNames(styles.item__link, {
		[styles.is_active]: props.active,
	});

	return (
		<li key={props.category.id} className={styles.item}>
			<Link to={`/category/${props.category.id}`} className={className}>
				{props.category.name}
			</Link>
		</li>
	);
};

Item.propTypes = {
	active: PropTypes.bool,
	category: PropTypes.object,
};

const CategoryList = props => {
	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{props.categories.map(category =>
					<Item
						key={category.id}
						category={category}
						active={category.id === props.currentCategory}
					/>
				)}
			</ul>
		</div>
	);
};

CategoryList.propTypes = {
	categories: Iteratable,
	currentCategory: PropTypes.string,
};

export default CategoryList;
