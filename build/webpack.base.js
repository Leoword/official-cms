'use strict';

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		bundle: [
			path.resolve(__dirname, '../src/index.js')
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_module/,
				loader: 'babel-loader'
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 8000,
					outputPath: 'images/'
				}
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'fonts/'
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(['css-loader'])
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
			},
			{
				test:/\.yaml$/,
				loader: 'json-loader!yaml-loader'
			},
		]
	},
	resolve: {
		extensions: ['.js', '.vue']
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, './index.html'),
			inject: 'head'
		})
	]
};
