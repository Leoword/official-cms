const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('collection', {
	sectionId: {
		type: Sequelize.INTEGER
	},
	argv: {
		type: Sequelize.JSON
	},
	comment: {
		type: Sequelize.STRING
	}
});