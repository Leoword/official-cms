<template>
	<div id="app">
		<div id="nav"><nav-bar></nav-bar></div>
		<div id="sidebar">
			<side-bar
				:items="[
					{
						name: $t('sidebar.article.title'),
						icon: 'fas fa-newspaper',
						children: [
							{name: $t('sidebar.article.list'), url: '#/article', tab: 'a'},
							{name: $t('sidebar.article.create'), url: '#/article/add', tab: 'b'},
							{name: $t('sidebar.article.batch'), url: '#/article/batch', tab: 'c'}
						]
					},
					{ name: $t('sidebar.category.title'), url: '#/category', icon: 'fas fa-th'},
					{ name: $t('sidebar.upload.title'), url: '#/upload', icon: 'fas fa-file-image'},
					{ name: $t('sidebar.page.title'), url: '#/page', icon: 'fas fa-window-restore'},
					{ name: $t('sidebar.user.title'), url: '#/user', icon: 'fas fa-user'}
				]"
			></side-bar>
		</div>
		<div id="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import NavBar from '../utils/NavBar.vue';
import SideBar from '../utils/SideBar.vue';

export default {
	components: { NavBar, SideBar },
};
</script>

<style lang="less">
@navbar-height: 56px;
@sidebar-width: 250px;

#sidebar {
	width: @sidebar-width;
	top: @navbar-height;
	bottom: 0;
	position: fixed;
	// background-color: #fff;
	border-right: 1px solid #D5DCDF;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

#content {
	position: fixed;
	top: @navbar-height;
	right: 0;
	bottom: 0;
	left: @sidebar-width;
	overflow-y: auto;
	background-color: #EEF5F9;
}
</style>