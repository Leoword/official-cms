import axiosRetrive from './axios';

export default {
	create(format) {
		return axiosRetrive.post('/format', format);
	},
	update() {
		
	},
	get() {

	},
	getList() {

	},
	delete() {

	}
};