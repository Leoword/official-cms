import { instance } from './apiConfig.js';

export default {
	create(category) {
		return instance.post('/category', category);
	},
	getList() {
		return instance.get('/category');
	},
	get(id) {
		return instance.get(`/category/${id}`);
	},
	delete(id) {
		return instance.delete(`/category/${id}`);
	},
	update(category) {
		return instance.put(`/category/${category.id}`, category);
	}
};