import { register, resolve } from 'store';
import { observable, computed } from 'mobx';
import Assignments from 'Collections/Assignments';

export const AssignmentDetailStore = {

		@observable currentId: null,

		@computed get current() {
			return Assignments.find(this.currentId);
		},

};

register('AssignmentDetailStore', AssignmentDetailStore);

export default resolve('AssignmentDetailStore');
