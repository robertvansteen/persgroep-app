import store from './Store';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import Spinner from 'Components/Spinner/Component';
import React, { Component, PropTypes } from 'react';
import AssignmentDetail from 'Components/AssignmentDetail/Component';
import {
	fetchAssignment,
	subscribeAssignment,
	unsubscribeAssignment,
	rejectAssignment,
} from 'Sources/Assignments';

class Assignments extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		params: PropTypes.object,
	}

	/**
	 * Invoked when the component will mount.
	 *
	 * @return {void}
	 */
	componentWillMount() {
		if (this.props.params.id !== store.currentId) store.currentId = null;
	}

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	*/
	componentDidMount() {
		fetchAssignment(this.props.params.id)
			.then(data => store.currentId = data.result);
	}

	/**
	 * Invoked when the component is about to receive props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	*/
	componentWillReceiveProps(nextProps) {
		if (this.props.params.id !== nextProps.params.id) {
			store.currentId = null;
			fetchAssignment(this.props.params.id)
				.then(data => store.currentId = data.result);
		}
	}

	/**
	 * Invoked when the subscribe button on the assignment is clicked.
	 *
	 * @return {void}
	 */
	onSubscribe = () => {
		switch (store.current.subscribe_status) {
		case 'pending': return unsubscribeAssignment(this.props.params.id);
		case 'accepted': return rejectAssignment(this.props.params.id);
		case 'rejected': return false;
		default: return subscribeAssignment(this.props.params.id);
		}
	}

	/**
	 * Render the componeont.
	 *
	 * @return {ReactElement}
	 */
	render() {
		if (!store.current) return <Spinner />;

		return (
			<AssignmentDetail
				assignment={store.current}
				onSubscribe={this.onSubscribe}
			/>
		);
	}
}

export default compose(
	observer,
)(Assignments);
