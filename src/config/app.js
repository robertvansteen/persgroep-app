import SocketProvider from 'Providers/Socket';
import ServiceWorkerProvider from 'Providers/ServiceWorker';

export default {

	/*
	|--------------------------------------------------------------------------
	| Application URL
	|--------------------------------------------------------------------------
	|
	| The URL the application is being host on, this is being used for
	| generating URL's that link to this application.
	|
	*/

	url: process.env.APP_URL || 'http://persgroep.rovansteen.nl',

	/*
	|--------------------------------------------------------------------------
	| Application version
	|--------------------------------------------------------------------------
	|
	| The current version of the application.
	|
	*/

	version: '1.0.0',

	/*
	|--------------------------------------------------------------------------
	| Application Timezone
	|--------------------------------------------------------------------------
	|
	| Here you can set the default timezone of the application.
	|
	*/
	timezone: 'GMT',

	/*
	|--------------------------------------------------------------------------
	| Providers
	|--------------------------------------------------------------------------
	|
	| Here you can define the providers that will be loaded with the application.
	|
	*/
	providers: [
		SocketProvider,
		ServiceWorkerProvider,
	],

};
