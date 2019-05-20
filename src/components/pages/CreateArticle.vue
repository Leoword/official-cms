<template>
	<editor 
	ref="editor"
	:article="article" 
	:category="category"
	@upload-article="createArticle"
	></editor>
</template>

<script>
import Editor from '../utils/Editor.vue';

export default {
	components: { Editor },
	data() {
		return {
			article: {
				title: '',
				language: 'zh',
				abstract: '',
				text: '',
				author: this.$store.state.user.username
			},
			category: {
				list: [],
				selected: []
			}
		};
	},
	mounted() {
		this.getCategoryList();
	},
	methods: {
		createArticle(language) {
			this.article.language = language;
			this.article.text = this.$refs.editor.getCode();

			this.$api.article.create(this.article).then(res => {
				this.createClassification(res.data.articleId);
			});
		},
		getCategoryList() {
			this.$api.category.getList().then(res => {
				this.category.list = res.data.map(category => {
					return { text: category.name, value: category.id };
				});
			});
		},
		createClassification(articleId) {
			Promise.all(this.category.selected.map(categoryId => {
				return this.$api.article.createClassification({articleId, categoryId});
			})).then(() => {
				this.$router.push('/article');
			});
		}
	},
};
</script>

<style lang="less">
#new-article {
	label {
		display: inline !important;
	}
}
</style>

