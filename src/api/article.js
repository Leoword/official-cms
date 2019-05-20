import { instance } from './apiConfig.js';

export default {
	create(article) {
		return instance.post('/article', article);
	},
	query() {
		return instance.get('/article');
	},
	get(articleId, params) {
		return instance.get(`/article/${articleId}`, {
			params
		});
	},
	createCommit({articleId, commit}) {
		return instance.post(	`/article/${articleId}/commit`, commit);
	},
	delete(articleId, lang) {
		return instance.delete(`/article/${articleId}`, {
			params: {
				lang
			}
		});
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