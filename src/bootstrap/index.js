/*
|--------------------------------------------------------------------------
| ES6 Polyfill
|--------------------------------------------------------------------------
|
| We include a babel polyfill to simulate an ES6 environment.
|
*/
import 'babel-polyfill';

/*
|--------------------------------------------------------------------------
| Offline support
|--------------------------------------------------------------------------
|
| Initialize webpack offline plugin for offline support.
|
*/
import offline from 'offline-plugin/runtime';
offline.install();

/*
|--------------------------------------------------------------------------
| Configuration
|--------------------------------------------------------------------------
|
| Load the configuration files.
|
*/

import * as config from 'config';

/*
|--------------------------------------------------------------------------
| Container
|--------------------------------------------------------------------------
|
| Import the (singleton) IoC container.
|
*/
import container from 'Library/Container';


/*
|--------------------------------------------------------------------------
| HTTP Kernel
|--------------------------------------------------------------------------
|
| Set up the HTTP kernel.
|
*/

import HttpKernel from 'Http/Kernel';
const kernel = new HttpKernel();
kernel.registerMiddlewares();


/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Load all the configured providers & boot them.
|
*/

config.app.providers.map(Provider => {
	const instance = new Provider(container);
	instance.register(container);
	instance.boot();
});
