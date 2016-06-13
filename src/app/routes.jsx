import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'Containers/App';
import Home from 'Domain/Home/Container';
import Login from 'Domain/Login/Container';

export default function getRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/login" component={Login} />
				<IndexRoute component={Home} />
			</Route>
		</Router>
	);
}
