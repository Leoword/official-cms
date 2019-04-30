import axios from 'axios';
import config from '../../config.json';

const { baseURL } = config;

export default {
	create(file) {
		return axios.post(`${baseURL}/file`, file, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},
	getList() {
		return axios.get(`${baseURL}/file`);
	},
	get(id) {
		return axios.get(`${baseURL}/file/${id}`);
	},
	delete(id) {
		return axios.delete(`${baseURL}/file/${id}`);
	}
};