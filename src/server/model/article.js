const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

exports.Article = sequelize.define('article', {
	hash: {
		type: Sequelize.UUID
	}
});

exports.Language = sequelize.define('language', {
	hash: {
		type: Sequelize.UUID
	},
	name: {
		type: Sequelize.STRING
	},
	article: {
		type: Sequelize.INTEGER
	},
	title: {
		type: Sequelize.STRING
	},
	abstract: {
		type: Sequelize.STRING
	},
	head: {
		type: Sequelize.STRING
	}
});

exports.Commit = sequelize.define('commit', {
	hash: {
		type: Sequelize.UUID
	},
	content: {
		type: Sequelize.TEXT
	},
	base: {
		type: Sequelize.INTEGER
	},
	language: {
		type: Sequelize.INTEGER
	},
	// author: {
	// 	type: Sequelize.ARRAY(Sequelize.INTEGER)
	// }
});

exports.Category = sequelize.define('category', {
	hash: {
		type: Sequelize.UUID
	},
	name: {
		type: Sequelize.STRING
	},
	comment: {
		type: Sequelize.STRING
	},
	parent: {
		type: Sequelize.INTEGER
	}
});

exports.AticleOfCategory = sequelize.define('articleOfCategory', {
	articleId: {
		type: Sequelize.INTEGER
	},
	categoryId: {
		type: Sequelize.INTEGER
	}
}, {
	timeStamp: false
});