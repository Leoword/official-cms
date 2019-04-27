import axios from 'axios';
import config from '../../config.json';

const {prefix} = config;

export const article = {
	create(article) {
		return axios.post(`${prefix}/article`, article);
	},
	getList() {
		return axios.get(`${prefix}/article`);
	},
	createClassification({articleId, categoryId}) {
		return axios.post(`${prefix}/article/${articleId}/category/${categoryId}`);
	},
	deleteClassification() {
		return axios.delete(`${prefix}/article/${articleId}/category/${categoryId}`);
	},
	getClassificationList(articleId) {
		return axios.get(`${prefix}/article/${articleId}/category`);
	}
};

export const language = {
	create({articleId, language}) {
		return axios.post(	`${prefix}/article/${articleId}`, language);
	},
	get(id) {
		return axios.get(`${prefix}/article/${id}`);
	},
	getList() {
		return axios.get(`${prefix}/article/language`);
	},
	update(id, language) {
		return axios.put(`${prefix}/article/${id}`, language);
	},
	delete(id) {
		return axios.delete(`${prefix}/article/${id}`);
	}
};