import Vue from 'vue';
import VueRouter from 'vue-router'; 

Vue.use(VueRouter);

import Welcome from '../components/pages/Welcome.vue';

import Article from '../components/pages/Article.vue';
import DeleteArticle from '../components/pages/DeleteArticle.vue';
import CreateArticle from '../components/pages/CreateArticle.vue';
import RetriveArticle from '../components/pages/RetriveArticle.vue';

import Category from '../components/pages/Category.vue';

import UploadFile from '../components/pages/UploadFile.vue';

import Section from '../components/pages/Section.vue';

import Format from '../components/pages/Format.vue';

import Page from '../components/pages/Page.vue';

const routes = [
	{
		path:'/',
		redirect:'/welcome'
	},
	{
		path: '/welcome',
		component: Welcome
	},
	{
		path: '/article/add',
		component: CreateArticle
	},
	{
		path: '/article',
		component: Article
	},
	{
		path: '/article/batch',
		component: DeleteArticle
	},
	{
		path: '/article/:id',
		component: RetriveArticle
	},
	{
		path: '/category',
		component: Category
	},
	{
		path: '/upload',
		component: UploadFile
	},
	{
		path: '/section',
		component: Section
	},
	{
		path: '/format',
		component: Format
	},
	{
		path: '/page',
		component: Page
	}
];

const router = new VueRouter({ routes });

export default router;