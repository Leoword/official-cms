import axios from 'axios';
import config from '../../config.json';

const {prefix} = config;

export default {
	create(file) {
		return axios.post(`${prefix}/file`, file, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},
	getList() {
		return axios.get(`${prefix}/file`);
	},
	get(id) {
		return axios.get(`${prefix}/file/${id}`);
	},
	delete(id) {
		return axios.delete(`${prefix}/file/${id}`);
	}
}