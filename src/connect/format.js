import axios from 'axios';

export default {
	create(format) {
		return axios.post('/api/format', format);
	},
	update(format) {
		return axios.put(`/api/format/${format.id}`, format);
	},
	get(id) {
		return axios.get(`/api/format/${id}`);
	},
	getList() {
		return axios.get('/api/format');
	},
	delete(id) {
		return axios.delete(`/api/format/${id}`);
	}
};