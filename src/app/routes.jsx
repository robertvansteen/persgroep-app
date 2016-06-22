import React from 'react';
import AuthStore from 'Stores/AuthStore';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from 'Containers/App';
import Story from 'Domain/Story/Container';
import Login from 'Domain/Login/Container';
import Logout from 'Domain/Logout/Container';
import Category from 'Domain/Category/Container';
import Assignments from 'Domain/Assignments/Container';
import CreateStory from 'Domain/CreateStory/Container';
import AssignmentDetail from 'Domain/AssignmentDetail/Container';

/**
 * Require authentication for the route.
 *
 * @param  {Object} nextState
 * @param  {Function} replace
 * @return {void}
 */
function requireAuth(nextState, replace) {
	if (!AuthStore.token) {
		replace({ pathname: '/login' });
	}
}

/**
 * Invoked when the route is updated/changed.
 *
 * @return {void}
 */
function onUpdate() {
	window.scrollTo(0, 0);
}

export default function getRoutes() {
	return (
		<Router onUpdate={onUpdate} history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} onEnter={requireAuth} />

				<Route path="/category/:id" component={Category} />
				<Route path="story/new" component={CreateStory} onEnter={requireAuth} />
				<Route path="/story/:id" component={Story} />

				<Route path="/assignments" component={Assignments} onEnter={requireAuth} />
				<Route path="/assignment/:id" component={AssignmentDetail} onEnter={requireAuth} />

				<IndexRedirect to="/category/1" />
			</Route>
		</Router>
	);
}
