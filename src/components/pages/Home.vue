<template>
	<div id="app">
		<div id="nav"><nav-bar></nav-bar></div>
		<div id="sidebar">
			<side-bar
				:items="[
					{
						name: $t('sidebar.article.title'),
						children: [
							{name: $t('sidebar.article.list'), url: '#/article'},
							{name: $t('sidebar.article.create'), url: '#/article/add'},
							{name: $t('sidebar.article.batch'), url: '#/article/batch'}
						]
					},
					{ name: $t('sidebar.category.title'), url: '#/category'},
					{ name: $t('sidebar.upload.title'), url: '#/upload'},
					{ name: $t('sidebar.page.title'), url: '#/page'},
					{ name: $t('sidebar.user.title'), url: '#/user'}
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
	background-color: #f0f0f0;
}

#content {
	position: fixed;
	top: @navbar-height;
	right: 0;
	bottom: 0;
	left: @sidebar-width;
	overflow-y: auto;
}
</style>