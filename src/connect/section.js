import axios from 'axios';

export default {
	create(section) {
		return axios.post('/api/section', section);
	},
	getList() {
		return axios.get('/api/section');
	},
	get(id) {
		return axios.get(`/api/section/${id}`);
	},
	delete(id) {
		return axios.delete(`/api/section/${id}`);
	},
	update(section) {
		return axios.put(`/api/section/${section.id}`, section);
	}
};
