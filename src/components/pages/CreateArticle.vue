<template>
	<editor :article="article" @upload-article="createArticle"
	ref="editor"
	:category="category"></editor>
</template>

<script>
import Editor from '../utils/Editor.vue';

export default {
	components: { Editor },
	methods: {

	},
	data() {
		return {
			article: {
				title: '',
				language: '',
				abstract: '',
				content: ''
			},
			category: {
				list: [],
				selected: []
			}
		}
	},
	computed: {
		articleId() {
			return this.$route.query.articleId;
		}
	},
	methods: {
		createArticle(language) {
			this.article.language = language;
			this.article.content = this.$refs.editor.getCode();

			if (this.articleId) {
				this.$api.language.create(this.articleId, this.article).then(res => {
					this.createClassification(this.articleId);
				});
			} else {
				this.$api.article.create(this.article).then(res => {
					this.createClassification(res.data.hash);
				});
			}
		},
		getCategoryList() {
			this.$api.category.getList().then(res => {
				this.category.List = res.data.map(category => {
					return {text: category.name, value: category.hash}
				});
			});
		},
		createClassification(articleId) {
			Promise.all(this.category.selected.map(categoryId => {
				return this.$api.article.createClassification({articleId, categoryId});
			})).then(res => {
				this.$router.push('/article');
			});
		}
	},
	mounted() {
		this.getCategoryList();
	}
};
</script>

<style lang="less">
#new-article {
	label {
		display: inline !important;
	}
}
</style>

