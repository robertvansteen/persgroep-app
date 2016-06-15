import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'Containers/App';
import Home from 'Domain/Home/Container';
import Story from 'Domain/Story/Container';
import Login from 'Domain/Login/Container';
import Category from 'Domain/Category/Container';

export default function getRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/login" component={Login} />
				<Route path="/category/:id" component={Category} />
				<Route path="/story/:id" component={Story} />
				<IndexRoute component={Home} />
			</Route>
		</Router>
	);
}
