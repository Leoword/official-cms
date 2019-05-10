import { instance } from './apiConfig.js';

export default {
	create(user) {
		return instance.post('/user', user);
	},

	get(id) {
		return instance.get(`/user/${id}`);
	},

	getList() {
		return instance.get('/user');
	},

	update(user) {
		return instance.put(`/user/${user.id}`, user);
	},

	delete(id) {
		return instance.delete(`/user/${id}`);
	},
	login(user) {
		return instance.post('/login', user);
	},
	getSession() {
		return instance.get('/session');
	},
	logout() {
		return instance.delete('/logout');
	}
};