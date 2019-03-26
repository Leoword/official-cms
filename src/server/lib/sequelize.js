const Sequelize = require('sequelize');
const {
	database, username, password, host, dialect, force,
	underscored, freezeTableName
} = global.config.db;

module.exports = new Sequelize(database, username, password, {
	host, dialect,
	define: {
		underscored, freezeTableName
	},
	sync: {
		force
	}
});