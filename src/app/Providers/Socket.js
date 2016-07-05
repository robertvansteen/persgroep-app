import io from 'socket.io-client';
import AuthStore from 'Stores/AuthStore';
import NotificationStore from 'Stores/Notifications';

class SocketProvider {

	/**
	 * Register the service provder with the container.
	 *
	 * @param  {container} container
	 * @return {void}
	 */
	register(container) {
		container.registerProvider('socket', this);
	}

	/**
	 * Boot up the service provider.
	 *
	 * @return {void}
	 */
	boot() {
		this.socket = io('localhost:3000');
		this.socket.on('story.liked', this.onStoryLike);
	}

	/**
	 * Invoked when a story is liked.
	 * We check if it's the story of the currently authenticated user, if so we
	 * show a notification.
	 *
	 * @param  {Object} like
	 * @return {void}
	 */
	onStoryLike({ like }) {
		const { user } = AuthStore;
		if (user && like.story.user_id === user.id) {
			NotificationStore.addNotification({
				type: 'like',
				message: `Your story is liked by ${like.user.name}`,
			});
		}
	}
}

export default SocketProvider;
