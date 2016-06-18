import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from 'Containers/App';
import Story from 'Domain/Story/Container';
import Login from 'Domain/Login/Container';
import Category from 'Domain/Category/Container';
import CreateStory from 'Domain/CreateStory/Container';

export default function getRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="/login" component={Login} />
				<Route path="/category/:id" component={Category} />
				<Route path="story/new" component={CreateStory} />
				<Route path="/story/:id" component={Story} />
				<IndexRedirect to="/category/1" />
			</Route>
		</Router>
	);
}
