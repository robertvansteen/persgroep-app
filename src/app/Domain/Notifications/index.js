import React from 'react';
import { observer } from 'mobx-react';
import NotificationStore from 'Stores/Notifications';
import NotificationBar from 'Components/NotificationBar';

const Notifications = () => {
	return (
		<NotificationBar notifications={NotificationStore.active} />
	);
};

export default observer(Notifications);
