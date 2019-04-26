
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'github-markdown-css';
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import App from './App.vue';
import router from './router';

import Vue2OrgTree from 'vue2-org-tree';

import apiConnect from './connect';

Vue.use(BootstrapVue);
Vue.use(Vue2OrgTree);

Vue.prototype.$api = apiConnect;

const app = new Vue(Object.assign({ router }, App));

window.addEventListener('load', () => app.$mount('#app'));