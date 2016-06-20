import getRoutes from 'routes';
import { createElement } from 'react';
import template from 'lodash/template';
import AuthStore from 'Stores/AuthStore';
import indexTemplate from 'Templates/index.html';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import createHistory from 'react-router/lib/createMemoryHistory';

/**
 * If there is a token stored as cookie set it to the store.
 *
 * @param  {Object} request
 * @return {void}
 */
function setSession(request) {
	const token = request.cookies.token;

	if (token) {
		AuthStore.token = token;
	}
}

/**
 * Render a flat react application based on the router state.
 *
 * @param  {Response} response
 * @param  {Object} routerState
 * @param  {Object} assets
 * @return {Response}
 */
function render(response, routerState, assets) {
	const componentHtml = renderToString(
		createElement(RouterContext, routerState),
	);

	const HTML = template(indexTemplate)({ componentHtml, assets });
	response.end(HTML);
}

/**
 * Run the application!
 *
 * @param  {Request} request
 * @param  {Response} response
 * @param  {Object} assets
 * @return {void}
 */
export default function (request, response, assets) {
	const routes = getRoutes();
	const location = createLocation(request.url);
	const history = createHistory(request.originalUrl);

	setSession(request);

	match({ history, routes, location }, (error, redirectLocation, routerState) => {
		if (error) {
			return response.status(500).end('Internal server error');
		}

		if (redirectLocation) {
			return response
				.redirect(302, redirectLocation.pathname + redirectLocation.search);
		}

		if (!routerState) {
			return response.status(400).end('Not found');
		}

		render(response, routerState, assets);
	});
}
