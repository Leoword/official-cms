import axios from 'axios';
import config  from '../../config.json';

const { baseURL } = config;

const instance = axios.create({
	baseURL: baseURL,
	timeout: 50000
});

export { instance };