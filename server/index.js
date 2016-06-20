/* eslint strict: 0 */
'use strict';

// Load environment variables
require('dotenv-safe').load();

const webpack = require('webpack');
const express = require('express');
const cookieParser = require('cookie-parser');
const config = {
	client: require('../internals/webpack/client.js'),
	server: require('../internals/webpack/server.js'),
};
const server = express();
const compiler = webpack(config.server);
const WebpackDevServer = require('webpack-dev-server');

let bundleValid = false;

// Set up the compiler
compiler.plugin('compile', () => {
	if (bundleValid) {
		bundleValid = false;
		delete require.cache[require.resolve('../build/bundle.server.js')];
	}

	console.log('Bundling...');
});

compiler.plugin('done', (stats) => {
	console.log('Bundling completed!');
	console.log(stats.toString({
		colors: true,
		chunks: false,
		children: false,
	}));
	console.log('');

	bundleValid = true;
});

compiler.watch({}, (error) => {
	if (error) {
		console.log('Something went wrong while building the server bundle.');
		console.log(error);
	}
});

// Set up the regular server
server.use(cookieParser());
server.use(express.static('build'));
server.use(express.static('public'));

server.use((request, response) => {
	let app;

	if (!bundleValid) {
		return response.status(400).end('Bundle not valid');
	}

	app = require('../build/bundle.server.js');

	return app.default(request, response);
});

console.log(`Listening at ${process.env.HOST} on port ${process.env.PORT}`);
server.listen(process.env.PORT);

// Set up hot server
const hotServer = new WebpackDevServer(webpack(config.client), {
	hot: true,
	stats: {
		colors: true,
		chunks: false,
		children: false,
	},
	historyApiFallback: true,
	contentBase: '../src/templates/',
});
hotServer.listen(process.env.HOT_PORT, process.env.HOST, (err) => {
	if (err) console.log(err);

	console.log(`Hot server listening at ${process.env.HOST} on port ${process.env.HOT_PORT}`);
});
