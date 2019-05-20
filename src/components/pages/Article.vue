<template>
	<b-container fluid id="article-list">
		<h1>{{$t('content.articleList.title')}}</h1>
		<b-row class="mt-4">
			<b-col cols="3">
				<b-form-group 
					:label="$t('content.articleList.keyword')"
					label-for="key"
					label-cols-sm="3"
					label-align-sm="left"
				>
					<b-form-input 
						id="key"
						v-model="filterByKey"
						size="sm"
						:placeholder="$t('content.articleList.keywordPlaceholder')"
						/>
				</b-form-group>
			</b-col>
			<b-col cols="3">
				<b-btn size="sm" @click="reset">{{$t('content.articleList.reset')}}</b-btn>
				<b-btn size="sm" type="submit" variant="primary">{{$t('content.articleList.search')}}</b-btn>
			</b-col>
			<b-col cols="auto" class="ml-auto">
				<b-pagination
					v-model="curPage"
					size="sm"
					:per-page="perPage"
					:total-rows="rows"
					aria-controls="article"
					class="pull-right"
					algin="right"
				/>
			</b-col>
		</b-row>
		
		<b-table
			id="article"
			hover
			:items="articleList"
			:current-page="curPage"
			:fields="[
				{key: 'title',	label: '文章标题'},
				{key: 'label'}
			]"
			:per-page="perPage"
		>
			<template slot="HEAD_title">
				{{ $t('content.articleList.title') }}
			</template>
			<template slot="HEAD_label">
				<b-dropdown 
					size="sm"
					:text="$t('content.articleList.table.author')" 
					variant="link"
					style="float: right"
					>
					<b-form-group>
						<b-form-checkbox-group v-model="authorOptions.selected"
							:options="authorOptions.list">
						</b-form-checkbox-group>
					</b-form-group>
				</b-dropdown>
				<b-dropdown 
					size="sm"
					:text="$t('content.articleList.table.lang')" 
					variant="link"
					style="float: right"
					>
					<b-form-group>
						<b-form-checkbox-group v-model="languageOptions.selected"
							:options="languageOptions.list">
						</b-form-checkbox-group>
					</b-form-group>
				</b-dropdown>
				<b-dropdown 
					size="sm"
					:text="$t('content.articleList.table.category')" 
					variant="link"
					style="float: right"
					>
					<b-form-group>
						<b-form-checkbox-group v-model="categoryOptions.selected"
							:options="categoryOptions.list">
						</b-form-checkbox-group>
					</b-form-group>
				</b-dropdown>
				<b-dropdown 
					size="sm"
					:text="$t('content.articleList.table.sortBy.name')"
					variant="link"
					style="float: right"
					>
					<b-dropdown-item>{{$t('content.articleList.table.sortBy.asc')}}</b-dropdown-item>
					<b-dropdown-item>{{$t('content.articleList.table.sortBy.desc')}}</b-dropdown-item>
				</b-dropdown>
			</template>

			<template 
				slot="title"
				slot-scope="data"
				>
				<div>
					<b-link 
						:to="`/article/${data.item.articleId}?lang=${data.item.lang}`"
						style="display:inline-block;width:10rem;"
						:title="data.item.title"
					>{{ data.item.title }}</b-link>
					<span class="ml-5">{{$t('content.articleList.table.createdBy')}} {{ format(data.item.createdAt) }}</span>
					<!-- <span class="ml-5">
						<i 
							class="fa fa-trash text-danger" style="font-size: 25px"
							aria-hidden="true"
							@click="deleteArticle(data.item.articleId)"
						></i>
						<i 
							class="fa fa-plus-circle text-primary ml-5" style="font-size: 25px"
							aria-hidden="true"
							@click="createCommit(data.item.articleId)"
						></i>
					</span> -->
				</div>
			</template>
		</b-table>
	</b-container>
</template>

<script>
import ISO6391 from '@ovl/iso-639-1';

const lang = new ISO6391();

export default {
	data() {
		return {
			perPage: 10,
			curPage: 1,
			articleList: [],
			filterByKey: '',
			sortOptions: {
				list: [],
				selected: []
			},
			categoryOptions: {
				list: [],
				selected: []
			},
			languageOptions: {
				list: [],
				selected: []
			},
			authorOptions: {
				list: [],
				selected: []
			}
		};
	},
	computed: {
		rows() {
			return this.articleList.length;
		},
		renderArticleList() {
			return this.articleList;
		}
	},
	methods: {
		reset() {
			this.filterByKey = null;
		},
		getArticleList() {
			this.$api.article.query().then(res => {
				this.articleList = res.data;
			});
		},
		setLanguageOption() {
			lang.getAllNames().forEach(name => {
				this.languageOptions.list.push({
					text: name, value: lang.getCode(name)
				});

				this.languageOptions.selected.push(lang.getCode(name));
			});
		},
		getCategoryList() {
			this.$api.category.getList().then(res => {
				const categoryList = res.data;

				categoryList.forEach(({name, id}) => {
					this.categoryOptions.list.push({
						text: name, value: id
					});

					this.categoryOptions.selected.push(id);
				});
			});
		},
		// deleteArticle(id) {
		// 	this.$api.article.delete(id).then(() => this.getArticleList());
		// },
		// createCommit(articleId) {
		// 	this.$router.push(`/article/add?articleId=${articleId}`);
		// }
	},
	mounted() {
		this.getArticleList();
		this.setLanguageOption();
		this.getCategoryList();
	}
};
</script>

<style lang="less">
#article-list {
	.b-dropdown {
		width: 15%;
	}
	.dropdown-menu {
		padding: 10px 15px;
	}
}
</style>
