import styles from './style';
import React, { PropTypes } from 'react';
import { Iteratable } from 'Library/PropTypes';
import Assignment from 'Components/Assignment/Component';

const AssignmentList = props => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>
				{props.title}
			</h2>
			<ul className={styles.list}>
				{props.assignments.map(assignment =>
					<Assignment key={assignment.id} assignment={assignment} />
				)}
			</ul>
		</div>
	);
};

AssignmentList.propTypes = {
	title: PropTypes.string,
	assignments: Iteratable,
};

export default AssignmentList;
