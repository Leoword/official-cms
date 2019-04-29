<template>
	<div id="app">
		<div id="navbar">
			<nav-bar></nav-bar>
		</div>

		<div id="sidebar">
			<menu-item 
				has-sub 
				name="文章管理" 
				:sub-items="[
					{ name: '文章列表', url: '/#/article'},
					{ name: '创建文章', url: '/#/article/add' },
					{ name: '批量删除', url: '/#/article/batch' }
				]"
			>
				{{ sub-items }}
			</menu-item>
			<menu-item
				name="类别管理"
				url="/#/category"
			></menu-item>
			<menu-item
				name="文件上传管理"
				url="/#/upload"
			></menu-item>
			<menu-item
				name="版块管理"
				url="/#/section"
			></menu-item>
			<menu-item
				name="版式管理"
				url="/#/format"
			></menu-item>
			<menu-item
				name="页面管理"
				url="/#/page"
			></menu-item>
		</div>

		<div id="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import MenuItem from './components/utils/MenuItem.vue';

export default {
	components: { NavBar, MenuItem },
	data() {
		return {
			name: '',
			sub: '',
			items: []
		};
	}
};
</script>

<style lang="less">
@navbar-height: 56px;
@sidebar-width: 300px;

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
