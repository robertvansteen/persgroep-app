import 'bootstrap';
import getRoutes from 'routes';
import { hydrate } from 'store';
import ReactDOM from 'react-dom';

hydrate(window.__INITIAL_STATE__);

// Render the application
ReactDOM.render(
	getRoutes(),
	document.getElementById('app')
);
