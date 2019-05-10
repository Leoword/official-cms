import { instance } from './apiConfig.js';

export default {
	create(article) {
		return instance.post('/article', article);
	},
	query() {
		return instance.get('/article');
	},
	get(articleId) {
		return instance.get(`/article/${articleId}`);
	},
	createCommit({articleId, commit}) {
		return instance.post(	`/article/${articleId}/commit`, commit);
	},
	delete(articleId) {
		return instance.delete(`/article/${articleId}`);
	},
	createClassification({articleId, categoryId}) {
		return instance.post(`/article/${articleId}/category/${categoryId}`);
	},
	deleteClassification({articleId, categoryId}) {
		return instance.delete(`/article/${articleId}/category/${categoryId}`);
	},
	getClassificationList(articleId) {
		return instance.get(`/article/${articleId}/category`);
	}
};