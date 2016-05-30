import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'Containers/App';
import Home from 'Components/Home/Home';

export default function getRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	);
}
