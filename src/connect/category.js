import axios from 'axios';

export default {
	create(category) {
		return axios.post('/api/category', category);
	},
	getList() {
		return axios.get('/api/category');
	},
	get(id) {
		return axios.get(`/api/category/${id}`);
	},
	delete(id) {
		return axios.delete(`/api/category/${id}`);
	},
	update(category) {
		return axios.put(`/api/category/${category.id}`, category);
	}
};