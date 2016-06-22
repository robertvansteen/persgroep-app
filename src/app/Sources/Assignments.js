import fetch from 'axios';
import { normalize, arrayOf } from 'normalizr';
import { assignmentSchema } from 'Stores/Schema';
import assignments from 'Collections/Assignments';

export function fetchAssignment(id) {
	return fetch(`/assignments/${id}`).then(response => {
		const data = normalize(response.data.assignment, assignmentSchema);
		assignments.addCollection(data.entities.assignments);
		return data;
	});
}

export function subscribeAssignment(id) {
	return fetch.post(`/assignments/${id}/subscribe`).then(() => {
		assignments.find(id).updateSubscribeStatus('pending');
	});
}

export function unsubscribeAssignment(id) {
	return fetch.post(`/assignments/${id}/unsubscribe`).then(() => {
		assignments.find(id).updateSubscribeStatus(null);
	});
}

export function rejectAssignment(id) {
	return fetch.post(`/assignments/${id}/reject`).then(() => {
		assignments.find(id).updateSubscribeStatus('rejected');
	});
}

export function fetchAssignments() {
	return fetch('/assignments').then(response => {
		const data = normalize(response.data, { assignments: arrayOf(assignmentSchema) });
		assignments.addCollection(data.entities.assignments);
		return data;
	});
}
