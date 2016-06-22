import { register, resolve } from 'store';
import { observable, computed } from 'mobx';
import Assignments from 'Collections/Assignments';

export const AssignmentsStore = {

		@computed get openAssignments() {
			return Assignments.filter((assignment) =>
				assignment.subscribe_status === null && assignment.status === 'open'
			);
		},

		@computed get pendingAssignments() {
			return Assignments.filter((assignment) =>
				assignment.subscribe_status === 'pending'
			);
		},

		@computed get acceptedAssignments() {
			return Assignments.filter((assignment) =>
				assignment.subscribe_status === 'accepted'
			);
		},

		@computed get rejectedAssignments() {
			return Assignments.filter((assignment) =>
				assignment.subscribe_status === 'rejected'
			);
		},
};

register('AssignmentsStore', AssignmentsStore);

export default resolve('AssignmentsStore');
