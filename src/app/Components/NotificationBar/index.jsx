import React from 'react';
import styles from './style';
import { observer } from 'mobx-react';
import { Iteratable } from 'Library/PropTypes';
import Transition from 'react-addons-css-transition-group';

/**
 * Get the icon for a notification type.
 *
 * @param  {String} type
 * @return {String}
 */
function getIcon(type) {
	switch (type) {
	case 'like': return 'icon-thumbs-up';
	default: return 'icon-bell';
	}
}

const NotificationBar = (props) => {
	return (
		<div className={styles.bar}>
			<Transition
				transitionName={styles}
				transitionEnterTimeout={400}
				transitionLeaveTimeout={200}
			>
				{props.notifications.map(notification =>
					<div className={styles.notification} key={notification.id}>
						<span className={styles.icon}>
							<i className={getIcon(notification.type)} />
						</span>
						<span className={styles.text}>
							{notification.message}
						</span>
					</div>
				)}
			</Transition>
		</div>
	);
};

NotificationBar.propTypes = {
	notifications: Iteratable,
};

export default observer(NotificationBar);
