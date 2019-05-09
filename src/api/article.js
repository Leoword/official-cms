import { instance } from './apiConfig.js';

export const article = {
	create(article) {
		return instance.post('/article', article);
	},
	getList() {
		return instance.get('/article');
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

export const language = {
	create({articleId, language}) {
		return instance.post(	`/article/${articleId}`, language);
	},
	get(id) {
		return instance.get(`/article/${id}`);
	},
	getList() {
		return instance.get('/article/language');
	},
	update(id, language) {
		return instance.put(`/article/${id}`, language);
	},
	delete(id) {
		return instance.delete(`/article/${id}`);
	}
};