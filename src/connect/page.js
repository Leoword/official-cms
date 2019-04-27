import axios from 'axios';
import config from '../../config.json';

const {prefix} = config;

export default {
	create(page) {
		return axios.post(`${prefix}/page`, page);
	},
	get(id) {
		return axios.get(`${prefix}/page/${id}`);
	},
	getList() {
		return axios.get(`${prefix}/page`);
	},
	update(id, page) {
		return axios.put(`${prefix}/page/${id}`, page);
	},
	delete(id) {
		return axios.delete(`${prefix}/page/${id}`);
	}
}