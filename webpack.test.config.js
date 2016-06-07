const PATH = __dirname;
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	target: 'node',
	externals: [nodeExternals()],
	devtool: 'cheap-module-source-map',

	// Instructions to how resolve the modules
	resolve: {
		root: `${PATH}/src/app`,
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.css'],
		fallback: path.join(PATH, 'node_modules'),
		alias: {
			env: path.join(PATH, 'env'),
		},
	},

	plugins: [
		new ExtractTextPlugin('main.css'),
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					plugins: ['transform-decorators-legacy'],
					presets: ['es2015', 'stage-0', 'react'],
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					`css-loader?modules&importLoaders=1
					&localIdentName=[local]!postcss-loader`
				),
			},
		],
	},
};
