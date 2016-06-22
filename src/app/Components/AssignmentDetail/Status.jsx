import styles from './style';
import React, { PropTypes } from 'react';

const MESSAGES = {
	pending: 'Je hebt je ingeschreven voor deze opdracht',
	accepted: 'Je bent uitgekozen voor deze opdracht',
	rejected: 'Deze opdracht is toegewezen aan iemand anders',
};

const Status = props => {
	return (
		<p className={styles.status}>{MESSAGES[props.status]}</p>
	);
};

Status.propTypes = {
	status: PropTypes.string,
};

export default Status;
