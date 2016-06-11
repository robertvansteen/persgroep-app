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
		// `webpack-dev-server/client?http://${process.env.HOST}:${process.env.HOT_PORT}`,
		// 'webpack/hot/only-dev-server',
		path.join(PATH, 'src/client'),
	],

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
});
