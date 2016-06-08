const PATH = __dirname;
const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	// Context of the app
	context: PATH,

	entry: './src/server',

	target: 'node',

	output: {
		path: `${PATH}/build`,
		publicPath: '/',
		filename: 'bundle.server.js',
		libraryTarget: 'commonjs2',
	},

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
		new DotenvPlugin({ sample: path.join(PATH, '.env.example') }),
		new ExtractTextPlugin('main.css'),
	],

	postcss: [
		require('postcss-modules-values'),
		require('postcss-extend'),
		require('postcss-nested'),
		require('autoprefixer'),
	],

	eslint: {
		configFile: path.join(PATH, '.eslintrc'),
	},

	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
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
					&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader`
				),
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				test: /\.html$/,
				loader: 'html',
			},
		],
	},
};
