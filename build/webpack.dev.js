const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');
const config = require('../config.json');

module.exports = merge(webpackBase, {
	mode: 'development',
	devServer: {
		proxy: {
			'/api': config.proxy,
			// '/api': 'http://localhost:8080'
		},
		host: '0.0.0.0'
	}
});