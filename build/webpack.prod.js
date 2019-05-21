'use strict';

const base = require('./webpack.base');
const config = require('../config.json');

base.mode = 'production';
base.output.publicPath = config.publicPath;

module.exports = Object.assign({}, base);
		

			