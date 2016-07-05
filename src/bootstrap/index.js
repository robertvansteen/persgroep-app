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
