import styles from './style';
import React, { PropTypes } from 'react';

const Sidebar = props => {
	return (
		<div className={styles.block} style={{ top: `${props.offsetTop}px` }}>
			<button onClick={props.onUploadClick}>
				<i className="icon-image"></i>
			</button>
		</div>
	);
};

Sidebar.propTypes = {
	offsetTop: PropTypes.number.isRequired,
	onUploadClick: PropTypes.func.isRequired,
};

export default Sidebar;
