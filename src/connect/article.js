import axios from 'axios';
import config from '../../config.json';

const { baseURL } = config;

export const article = {
	create(article) {
		return axios.post(`${baseURL}/article`, article);
	},
	getList() {
		return axios.get(`${baseURL}/article`);
	},
	createClassification({articleId, categoryId}) {
		return axios.post(`${baseURL}/article/${articleId}/category/${categoryId}`);
	},
	deleteClassification({articleId, categoryId}) {
		return axios.delete(`${baseURL}/article/${articleId}/category/${categoryId}`);
	},
	getClassificationList(articleId) {
		return axios.get(`${baseURL}/article/${articleId}/category`);
	}
};

export const language = {
	create({articleId, language}) {
		return axios.post(	`${baseURL}/article/${articleId}`, language);
	},
	get(id) {
		return axios.get(`${baseURL}/article/${id}`);
	},
	getList() {
		return axios.get(`${baseURL}/article/language`);
	},
	update(id, language) {
		return axios.put(`${baseURL}/article/${id}`, language);
	},
	delete(id) {
		return axios.delete(`${baseURL}/article/${id}`);
	}
};