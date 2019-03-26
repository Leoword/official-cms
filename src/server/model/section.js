const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('section', {
	name: {
		type: Sequelize.STRING
	},
	comment: {
		type: Sequelize.STRING
	},
	formatId: {
		type: Sequelize.INTEGER
	}
});