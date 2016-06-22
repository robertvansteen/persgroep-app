import styles from './style';
import React, { PropTypes } from 'react';

const Title = props => {
	return (
		<h1 className={styles.title}>
			{props.children}
		</h1>
	);
};

 Title.propTypes = {
	 children: PropTypes.node,
 };

 export default Title;
