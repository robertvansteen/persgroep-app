import { register, resolve } from 'store';
import { observable, computed } from 'mobx';
import Assignments from 'Collections/Assignments';

export const AssignmentsStore = {

		@observable openAssignmentsIds: [],

		@computed get openAssignments() {
			return this.openAssignmentsIds.map((id) => Assignments.find(id));
		},

};

register('AssignmentsStore', AssignmentsStore);

export default resolve('AssignmentsStore');
