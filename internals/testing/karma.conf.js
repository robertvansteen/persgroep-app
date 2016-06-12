const webpackConfig = require('../webpack/test');
const path = require('path');

module.exports = (config) => {
	config.set({
		frameworks: ['mocha', 'sinon-chai'],
		reporters: ['coverage', 'mocha'],
		browsers: process.env.TRAVIS
      ? ['ChromeTravis']
      : ['Chrome'],

		autoWatch: false,
		singleRun: true,

		/**
		 * Define the karma file.
		 *
		 * @type {Array}
		 */
		files: [{
			pattern: './test-bundler.js',
			watched: false,
			served: true,
			included: true,
		}],

		// Setup the preprocessors
		preprocessors: {
			['./test-bundler.js']: ['webpack'],
		},

		// Load the webpack configuration
		webpack: webpackConfig,

		// Prevent webpack spamming
		webpackMiddleware: {
			noInfo: true,
			stats: 'errors-only',
		},

		customLaunchers: {
			ChromeTravis: {
				base: 'Chrome',
				flags: ['--no-sandbox'],
			},
		},

		coverageReporter: {
			dir: path.join(process.cwd(), 'coverage'),
			reporters: [
				{ type: 'lcov', subdir: 'lcov' },
				{ type: 'html', subdir: 'html' },
				{ type: 'text-summary' },
			],
		},
	});
};
