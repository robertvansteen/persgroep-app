const PATH = process.cwd();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = require('./base')({

	entry: path.join(PATH, 'src/server'),

	target: 'node',

	output: {
		path: path.join(PATH, 'build'),
		publicPath: '/',
		filename: 'bundle.server.js',
		libraryTarget: 'commonjs2',
	},

	plugins: [
		new ExtractTextPlugin('main.css'),
		new HtmlWebpackPlugin({
			filename: '_index.html',
			template: 'src/app/Templates/index.html',
		}),
	],

	eslint: {
		configFile: path.join(PATH, '.eslintrc'),
	},

	cssLoaders: ExtractTextPlugin.extract(
		'style-loader',
		'css-loader?modules&importLoaders=1' +
		'&localIdentName=[local]__[path][name]__[hash:base64:5]',
		'postcss-loader'
	),

	cssVendorLoaders: ExtractTextPlugin.extract(
		'style-loader',
		'css-loader'
	),
});
