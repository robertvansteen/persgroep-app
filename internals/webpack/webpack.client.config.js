const PATH = __dirname;
const path = require('path');
const webpack = require('webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {

	// Context of the app
	context: PATH,

	devtool: '#cheap-module-eval-source-map',

	entry: [
		`webpack-dev-server/client?http://${process.env.HOST}:${process.env.HOT_PORT}`,
		'webpack/hot/only-dev-server',
		'./src/client',
	],

	output: {
		path: `${PATH}/hot`,
		publicPath: `http://${process.env.HOST}:${process.env.HOT_PORT}/`,
		filename: 'bundle.client.js',
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
		new webpack.HotModuleReplacementPlugin(),
	],

	postcss: [
		require('postcss-modules-values'),
		require('postcss-extend'),
		require('postcss-nested'),
		require('autoprefixer'),
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
					'react-hot',
					'babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				loader: `style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader`,
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
