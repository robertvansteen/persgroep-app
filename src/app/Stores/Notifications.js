import uuid from 'node-uuid';
import { register, resolve } from 'store';
import { observable, action } from 'mobx';

/*
|--------------------------------------------------------------------------
| Notifications store
|--------------------------------------------------------------------------
|
| This store holds all the notifications.
|
*/
export class Notifications {

	/**
	 * The currently active notifications.
	 *
	 * @type {Array}
	 */
	@observable active = [];

	/**
	 * Add a notification.
	 *
	 * @param {String} message
	 */
	@action addNotification(data) {
		const id = uuid.v4();
		const notification = { id, ...data };

		this.active = [];
		this.active.push(notification);
		setTimeout(this.clearNotification.bind(this), 5000);
	}

	@action clearNotification() {
		this.active = [];
	}
}

register('Notifications', Notifications);

export default resolve('Notifications');
