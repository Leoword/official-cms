<template>
	<div id="app">
		<div id="navbar">
			<nav-bar></nav-bar>
		</div>

		<div id="sidebar">
			<menu-item 
				has-sub 
				:name="$t('sidebar.article.name')" 
				:sub-items="[
					{ name: $t('sidebar.article.list'), url: '/#/article'},
					{ name: $t('sidebar.article.create'), url: '/#/article/add' },
					{ name: $t('sidebar.article.delete'), url: '/#/article/batch' }
				]"
			>
				{{ sub-items }}
			</menu-item>
			<menu-item
				:name="$t('sidebar.category.name')"
				url="/#/category"
			></menu-item>
			<menu-item
				:name="$t('sidebar.upload.name')"
				url="/#/upload"
			></menu-item>
			<menu-item
				:name="$t('sidebar.section.name')"
				url="/#/section"
			></menu-item>
			<menu-item
				:name="$t('sidebar.format.name')"
				url="/#/format"
			></menu-item>
			<menu-item
				:name="$t('sidebar.page.name')"
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
