import { action } from 'mobx';
import BaseModel from 'Entities/BaseModel';

export default class Assignment extends BaseModel {

	/**
	 * Update the subscribe status of an assignment.
	 *
	 * @param  {String} status
	 * @return {void}
	 */
	@action updateSubscribeStatus(status) {
		this.subscribe_status = status;
	}
}
