import { instance } from './apiConfig.js';

export default {
	create(page) {
		return instance.post('/page', page);
	},
	get(id) {
		return instance.get(`/page/${id}`);
	},
	getList() {
		return instance.get('/page');
	},
	update(id, page) {
		return instance.put(`/page/${id}`, page);
	},
	delete(id) {
		return instance.delete(`/page/${id}`);
	}
}