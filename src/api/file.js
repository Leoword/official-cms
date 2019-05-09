import { instance } from './apiConfig.js';

export default {
	create(file) {
		return instance.post('/file', file, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},
	getList() {
		return instance.get('/file');
	},
	get(id) {
		return instance.get(`/file/${id}`);
	},
	delete(id) {
		return instance.delete(`/file/${id}`);
	}
};