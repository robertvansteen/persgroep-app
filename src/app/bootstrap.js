import HttpKernel from 'Http/Kernel';

/**
 * Set up the HTTP kernel.
 */
const kernel = new HttpKernel();
kernel.registerMiddlewares();
