const PATH = process.cwd();
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = require('./base')({
	output: {
		path: path.join(PATH, 'build'),
		filename: '[name].[hash].js',
	},

	entry: path.join(PATH, 'src/client'),

	plugins: [
		new ExtractTextPlugin('[name].[contenthash].css'),
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('production') },
		}),
	],

	cssLoaders: ExtractTextPlugin.extract(
		'style-loader',
		'css-loader?modules&importLoaders=1' +
		'&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
	),

	cssVendorLoaders: ExtractTextPlugin.extract(
		'style-loader',
		'css-loader'
	),
});
