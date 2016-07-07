require('dotenv-safe').load();

const fs = require('fs');
const PATH = process.cwd();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const packageName = JSON.parse(fs.readFileSync('./package.json', 'utf8')).name;

module.exports = require('./base')({
	output: {
		publicPath: '/build',
		path: path.join(PATH, 'build'),
		filename: 'bundle.[name].[hash].js',
	},

	entry: path.join(PATH, 'src/client'),

	plugins: [
		new ExtractTextPlugin('bundle.[name].[contenthash].css'),
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('production') },
		}),
		new HtmlWebpackPlugin({
			filename: '_index.html',
			template: 'src/app/Templates/index.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'shell.html',
			template: 'src/app/Templates/shell.html',
		}),
		new SWPrecacheWebpackPlugin({
			cacheId: packageName,
			dynamicUrlToDependencies: {
				'/shell': ['src/app/Templates/shell.html'],
			},
			staticFileGlobs: [
				'build/bundle.*.js',
				'build/bundle.*.css',
				'public/manifest.json',
				'public/**/*.{js,html,css,png,jpg,jpeg,gif,svg}',
				'!public/service/**/*',
			],
			filename: 'service-worker.js',
			stripPrefix: 'public/',
			replacePrefix: '',
			navigateFallback: '/shell',
			importScripts: ['service/config.js'],
			runtimeCaching: [{
				urlPattern: new RegExp(`^${process.env.API_ENDPOINT}`),
				handler: 'networkFirst',
			}, {
				urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
				handler: 'cacheFirst',
			}, {
				urlPattern: /^https:\/\/use\.typekit\.net\//,
				handler: 'cacheFirst',
			}, {
				urlPattern: /^https:\/\/file\.myfontastic\.com\//,
				handler: 'cacheFirst',
			}, {
				urlPattern: /.(jpg|png)$/,
				handler: 'cacheFirst',
			}],
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
