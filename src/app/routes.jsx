import React from 'react';
import AuthStore from 'Stores/AuthStore';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from 'Containers/App';
import Story from 'Domain/Story/Container';
import Login from 'Domain/Login/Container';
import Category from 'Domain/Category/Container';
import CreateStory from 'Domain/CreateStory/Container';

/**
 * Require authentication for the route.
 *
 * @param  {Object} nextState
 * @param  {Function} replace
 * @return {void}
 */
function requireAuth(nextState, replace) {
	console.log(AuthStore.token);
	if (!AuthStore.token) {
		replace({ pathname: '/login' });
	}
}

export default function getRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/login" component={Login} />
				<Route path="/category/:id" component={Category} />
				<Route path="story/new" component={CreateStory} onEnter={requireAuth} />
				<Route path="/story/:id" component={Story} />
				<IndexRedirect to="/category/1" />
			</Route>
		</Router>
	);
}
