import 'bootstrap';
import 'isomorphic-fetch';
import getRoutes from 'routes';
import ReactDOM from 'react-dom';

// Render the application
ReactDOM.render(
	getRoutes(),
	document.getElementById('app')
);
