'use strict';

const baseConfig = require('./webpack.base');

const devConfig = Object.assign(baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		port: 8000,
		host: '0.0.0.0', //localhost or ip
		proxy: {
			'/api' : '' //base to project's router
		}
	}
});

devConfig.output.publicPath = '' ; // project's prefix

module.exports = devConfig;