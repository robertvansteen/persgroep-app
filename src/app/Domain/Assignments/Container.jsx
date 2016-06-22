import store from './Store';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import Title from 'Components/Title/Component';
import { fetchAssignments } from 'Sources/Assignments';
import AssignmentList from 'Components/AssignmentList/Component';

class Assignments extends Component {

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	*/
	componentDidMount() {
		fetchAssignments();
	}

	/**
	 * Render the componeont.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div>
				<Title>Opdrachten</Title>
				<AssignmentList
					title="Open"
					assignments={store.openAssignments}
				/>
				<AssignmentList
					title="Pending"
					assignments={store.pendingAssignments}
				/>
				<AssignmentList
					title="Active"
					assignments={store.acceptedAssignments}
				/>
				<AssignmentList
					title="Rejected"
					assignments={store.rejectedAssignments}
				/>
			</div>
		);
	}
}

export default compose(
	observer,
)(Assignments);
