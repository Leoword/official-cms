import axios from 'axios';
import config from '../../config.json';

const { baseURL } = config;

export default {
	create(page) {
		return axios.post(`${baseURL}/page`, page);
	},
	get(id) {
		return axios.get(`${baseURL}/page/${id}`);
	},
	getList() {
		return axios.get(`${baseURL}/page`);
	},
	update(id, page) {
		return axios.put(`${baseURL}/page/${id}`, page);
	},
	delete(id) {
		return axios.delete(`${baseURL}/page/${id}`);
	}
}