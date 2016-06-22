import fetch from 'axios';
import { normalize, arrayOf } from 'normalizr';
import { assignmentSchema } from 'Stores/Schema';
import assignments from 'Collections/Assignments';

export function fetchOpenAssignments() {
	return fetch('/assignments?status=open').then(response => {
		const data = normalize(response.data, { data: arrayOf(assignmentSchema) });
		assignments.addCollection(data.entities.assignments);
		return data;
	});
}
