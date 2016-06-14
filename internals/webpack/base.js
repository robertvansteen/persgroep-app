const PATH = process.cwd();
const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = (options) => ({

	/**
	 * Define the entry point for the webpack configuration.
	 *
	 * @type {mixed}
	 */
	entry: options.entry,

	/**
	 * Define the output options.
	 *
	 * @type {Object}
	 */
	output: options.output,

	/**
	 * Define the devtool (source map) configuration.
	 *
	 * @type {String}
	 */
	devtool: '#cheap-module-eval-source-map',

	/**
	 * Define the target in which the compilation will run.
	 *
	 * @type {String}
	 */
	target: options.target || 'web',

	/**
	 * Module resolving.
	 *
	 * @type {Object}
	 */
	resolve: {
		root: path.join(PATH, 'src/app'),
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.css'],
		fallback: path.join(PATH, 'node_modules'),
		alias: {
			env: path.join(PATH, 'env'),
		},
	},

	/**
	 * Plugin configuration.
	 *
	 * @type {Array}
	 */
	plugins: options.plugins.concat([
		new DotenvPlugin({ sample: path.join(PATH, '.env.example') }),
	]),

	/**
	 * Post CSS configuration.
	 *
	 * @type {Array}
	 */
	postcss: [
		require('postcss-modules-values'),
		require('postcss-extend'),
		require('postcss-nested'),
		require('autoprefixer'),
	],

	/**
	 * Configuration of the webpack modules.
	 *
	 * @type {Object}
	 */
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
					'react-hot',
					'babel',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				loader: options.cssLoaderQuery
					|| 'style!css-loader?' +
						'modules&importLoaders=1' +
						'&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
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
});
