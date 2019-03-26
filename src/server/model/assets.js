const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('asset', {
	hash: {
		type:Sequelize.UUID
	},
	comment: {
		type: Sequelize.STRING
	},
	type: {
		type: Sequelize.STRING
	},
	file: {
		type: Sequelize.BLOB
	}
});