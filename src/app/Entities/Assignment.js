import { action } from 'mobx';
import BaseModel from 'Entities/BaseModel';

export default class Assignment extends BaseModel {
	@action updateStatus(status) {
		console.log('Updating status to', status);
		this.status = 'status';
	}
}
