import Button from 'Components/Button';
import React, { PropTypes } from 'react';

const SubscribeButton = props => {
	const buttonLabel = () => {
		switch (props.status) {
		case 'pending': return 'Uitschrijven';
		case 'accepted': return 'Afwijzen';
		default: return 'Inschrijven';
		}
	};

	const buttonState = () => {
		switch (props.status) {
		case 'accepted': return 'error';
		default: return 'default';
		}
	};

	return (
		<Button
			state={buttonState()}
			label={buttonLabel()}
			onClick={props.onClick}
		/>
	);
};

SubscribeButton.propTypes = {
	status: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

export default SubscribeButton;
