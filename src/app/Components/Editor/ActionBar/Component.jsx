import styles from './style.css';
import React, { PropTypes } from 'react';
import Button from 'Components/Button/Component';

const ActionBar = props => {
	return (
		<div className={styles.bar}>
			<Button type="text" label="Publish" onClick={props.onPublish} />
		</div>
	);
};

ActionBar.propTypes = {
	onPublish: PropTypes.func.isRequired,
};

export default ActionBar;
