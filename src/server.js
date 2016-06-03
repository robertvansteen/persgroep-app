import _ from 'lodash';
import 'isomorphic-fetch';
import getRoutes from 'routes';
import { createElement } from 'react';
import template from 'Templates/index.html';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import createHistory from 'react-router/lib/createMemoryHistory';

function render(response, routerState) {
	const componentHtml = renderToString(
		createElement(RouterContext, routerState),
	);

	const HTML = _.template(template)({ componentHtml });
	response.end(HTML);
}

export default function (request, response) {
	const routes = getRoutes();
	const location = createLocation(request.url);
	const history = createHistory(request.originalUrl);

	match({ history, routes, location }, (error, redirectLocation, routerState) => {
		if (error) {
			return response.status(500).end('Internal server error');
		}

		if (!routerState) {
			return response.status(400).end('Not found');
		}

		render(response, routerState);
	});
}
