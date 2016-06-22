import store from './Store';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { fetchOpenAssignments } from 'Sources/Assignments';
import AssignmentList from 'Components/AssignmentList/Component';

class Assignments extends Component {

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	*/
	componentDidMount() {
		fetchOpenAssignments()
			.then(data => store.openAssignmentsIds = data.result.data);
	}

	/**
	 * Render the componeont.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div>
				<AssignmentList
					title="Open"
					assignments={store.openAssignments}
				/>
				<AssignmentList
					title="Pending"
					assignments={[]}
				/>
				<AssignmentList
					title="Active"
					assignments={[]}
				/>
			</div>
		);
	}
}

export default compose(
	observer,
)(Assignments);
