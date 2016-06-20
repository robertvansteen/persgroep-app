const PATH = process.cwd();
const path = require('path');
const webpack = require('webpack');

module.exports = require('./base')({
	output: {
		path: path.join(PATH, 'hot'),
		publicPath: `http://${process.env.HOST}:${process.env.HOT_PORT}/`,
		filename: 'bundle.client.js',
	},

	entry: [
		`webpack-dev-server/client?http://${process.env.HOST}:${process.env.HOT_PORT}`,
		'webpack/hot/only-dev-server',
		path.join(PATH, 'src/client'),
	],

	cssLoaders: 'style-loader!css-loader?'
	+ 'localIdentName=[local]__[path][name]__[hash:base64:5]'
	+ '&modules&importLoaders=1&sourceMap!postcss-loader',

	cssVendorLoaders: 'style-loader!css-loader',

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
});
