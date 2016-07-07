import io from 'socket.io-client';
import AuthStore from 'Stores/AuthStore';
import Stories from 'Collections/Stories';
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
		this.socket = io(process.env.SOCKET);
		this.socket.on('story.liked', this.onStoryLike);
		this.socket.on('story.unliked', this.onStoryUnlike);
	}

	/**
	 * Invoked when a story is liked.
	 * We check if it's the story of the currently authenticated user, if so we
	 * show a notification.
	 *
	 * @param  {Object} payload
	 * @return {void}
	 */
	onStoryLike({ like, story }) {
		const { user } = AuthStore;
		const author = story.user_id;
		const liker = like.user_id;

		if (user && author === user.id && liker !== user.id) {
			NotificationStore.addNotification({
				type: 'like',
				message: `Your story is liked by ${like.user.name}`,
			});
		}

		const localStory = Stories.find(story.id);
		localStory.like_count = story.like_count;
	}

	/**
	 * Invoked when a story is unliked.
	 *
	 * @param  {Object} payload
	 * @return {void}
	 */
	onStoryUnlike({ story }) {
		const localStory = Stories.find(story.id);
		localStory.like_count = story.like_count;
	}
}

export default SocketProvider;
