import React, { PropTypes } from 'react';
import Button from 'Components/Button/Component';

const SubscribeButton = props => {
	const buttonLabel = () => {
		switch (props.status) {
		case 'pending': return 'In afwachting';
		case 'accepted': return 'Geaccepteerd';
		case 'rejected': return 'Afgewezen';
		default: return 'Inschrijven';
		}
	};

	const buttonState = () => {
		switch (props.status) {
		case 'pending': return 'inactive';
		case 'accepted': return 'success';
		case 'rejected': return 'error';
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
