const _ = require('lodash');

const DEFAULT_ASSETS = {
	js: 'bundle.client.js',
	css: 'main.css',
};

const fetchAssets = () => {
	try {
		return require('../webpack-assets.json').main;
	} catch (error) {
		return DEFAULT_ASSETS;
	}
};

const parseAssets = assets => {
	return _.mapValues(assets, value => `/${value}`);
};

module.exports = parseAssets(fetchAssets());
