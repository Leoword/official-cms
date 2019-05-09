import Vue from 'vue';
import VueRouter from 'vue-router'; 

Vue.use(VueRouter);

import Login from '../components/pages/Login.vue';

import Home from '../components/pages/Home.vue';
import Welcome from '../components/pages/Welcome.vue';

import Article from '../components/pages/Article.vue';
import DeleteArticle from '../components/pages/DeleteArticle.vue';
import CreateArticle from '../components/pages/CreateArticle.vue';
import RetriveArticle from '../components/pages/RetriveArticle.vue';

import Category from '../components/pages/Category.vue';

import UploadFile from '../components/pages/UploadFile.vue';

import Page from '../components/pages/Page.vue';

import User from '../components/pages/User.vue';

import store from '../store';

function auth() {
	if(store.state.user.id && store.state.user.username) {
		return true;
	}

	return false;
	// return true;
}

const routes = [
	{
		path:'/',
		redirect:'/home'
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/home',
		component: Home,
		children: [
			{
				path: '/',
				component: Welcome
			},
			{
				path: '/article/add',
				component: CreateArticle,
			},
			{
				path: '/article',
				component: Article,
			},
			{
				path: '/article/batch',
				component: DeleteArticle,
			},
			{
				path: '/article/:id',
				component: RetriveArticle,
			},
			{
				path: '/category',
				component: Category,
			},
			{
				path: '/upload',
				component: UploadFile,
			},
			{
				path: '/page',
				component: Page,
			},
			{
				path: '/user',
				component: User,
			}
		]
	}
];

const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
	if(to.path === '/login') {
		auth() ? next({path: '/'}) : next();
	} else {
		auth() ? next() : next({ path: '/login' });
	}
});

export default router;