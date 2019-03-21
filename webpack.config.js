const path = require('path');

const development = {
	mode: 'development',
	context: path.resolve(__dirname),
	entry: ['webpack/hot/dev-server', './src/index.jsx'],
	output: {
		path: path.resolve(__dirname, './public'),
		publicPath: '/',
		filename: 'bundle.js',
		chunkFilename: '[chunkhash].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		contentBase: [
			path.resolve(__dirname, './public'),
			path.resolve(__dirname, './public/markdown'),
			path.resolve(__dirname, './public/assets'),
		],
		historyApiFallback: true,
		watchContentBase: true,
		host: '0.0.0.0',
		port: 3000,
		hot: true,
	},
	devtool: 'source-map',
};

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const production = {
	mode: 'production',
	context: path.resolve(__dirname),
	entry: './src/index.jsx',
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
	},
	output: {
		path: path.resolve(__dirname, './public'),
		publicPath: '/',
		filename: 'bundle.js',
		chunkFilename: '[chunkhash].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};

module.exports = env => (env === 'dev' ? development : production);
