const PATH = __dirname;
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {

	target: 'node', // in order to ignore built-in modules like path, fs, etc.
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
				loader: 'null-loader',
			},
		],
	},
};
