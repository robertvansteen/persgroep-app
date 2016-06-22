import styles from './style';
import React, { PropTypes } from 'react';
import SubscribeButton from './SubscribeButton';

const Actions = props => {
	return (
		<div className={styles.action}>
			{props.status !== 'rejected'
				? <SubscribeButton
					status={props.status}
					onClick={props.onClick}
				/>
				: null
			}
		</div>
	);
};

Actions.propTypes = {
	onClick: PropTypes.func,
	status: PropTypes.string,
};

export default Actions;
