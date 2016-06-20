/* eslint strict: 0 */
'use strict';

// Load environment variables
require('dotenv-safe').load();

// Load assets
const assets = require('./assets');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const server = express();

// Set up the regular server
server.use(cookieParser());
server.use(compression());
server.use(express.static('build', {
	maxage: '365d',
}));
server.use(express.static('public'));

server.use((request, response) => {
	const app = require('../build/bundle.server.js');

	return app.default(request, response, assets);
});

console.log(`Listening at ${process.env.HOST} on port ${process.env.PORT}`);
server.listen(process.env.PORT);
