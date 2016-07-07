/* eslint strict: 0 */
'use strict';

// Load environment variables
require('dotenv-safe').load();

const fs = require('fs');
const PATH = process.cwd();
const path = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const server = express();

const template = fs.readFileSync('./build/_index.html').toString();

// Set up the regular server
server.use(cookieParser());
server.use(compression());
server.use('/', express.static('build'));
server.use('/build', express.static('build'));
server.use(express.static('public'));

server.get('/shell', (request, response) => {
	return response.sendFile(path.join(PATH, 'build/shell.html'));
});

server.use((request, response) => {
	const app = require('../build/bundle.server.js');
	return app.default(request, response, template);
});

console.log(`Listening at ${process.env.HOST} on port ${process.env.PORT}`);
server.listen(process.env.PORT);
