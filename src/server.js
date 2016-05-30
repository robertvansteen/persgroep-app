import _ from 'lodash';
import 'isomorphic-fetch';
import getRoutes from 'routes';
import { createElement } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'Core/Store';
import template from 'Templates/index.html';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';

function fetchAll(routerState, store) {
	return routerState.components.map(component => {
		if (component && component.fetchData) {
			return component.fetchData(
				store.getState(),
				routerState.params,
				routerState.location,
			);
		}
	});
}

function postAll(routerState, store, request, response) {
	if (request.method !== 'POST') return [];

	return routerState.components.map(component => {
		if (component && component.postData) {
			return component.postData(
				store.getState(),
				request.body,
				store.dispatch,
				response,
			);
		}
	});
}

function render(response, store, routerState) {
	const finalState = store.getState();

	const componentHtml = renderToString(
		createElement(
			Provider,
			{ store },
			createElement(RouterContext, routerState),
		)
	);

	const HTML = _.template(template)({ finalState, componentHtml });
	response.end(HTML);
}

export default function (request, response) {
	const location = createLocation(request.url);
	const memoryHistory = createHistory(request.originalUrl);
	const store = createStore(memoryHistory);
	const history = syncHistoryWithStore(memoryHistory, store);
	const routes = getRoutes(store);

	match({ history, routes, location }, (error, redirectLocation, routerState) => {
		if (error) {
			return response.status(500).end('Internal server error');
		}

		if (!routerState) {
			return response.status(400).end('Not found');
		}

		const promises = _.concat(
			fetchAll(routerState, store),
			postAll(routerState, store, request, response),
		);

		Promise.all(promises)
			.then(() => render(response, store, routerState))
			.catch((err) => {
				console.error(err);
				response.status(500).end('Something went wrong');
			});
	});
}
