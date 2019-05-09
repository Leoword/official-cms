
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'github-markdown-css';
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import App from './App.vue';
import router from './router';
import i18n from './components/i18n';
import store from './store';

import api from './api';

import mixin from './components/mixin';

Vue.use(BootstrapVue);
Vue.mixin(mixin);

Vue.prototype.$api = api;

const app = new Vue(Object.assign({ router, i18n, store }, App));

window.addEventListener('load', () => app.$mount('#app'));