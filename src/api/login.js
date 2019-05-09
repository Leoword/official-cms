import { instance } from './apiConfig.js';

export const login = {
	login(user) {
		return instance.get('/login', user.username, user.password);
	}
};