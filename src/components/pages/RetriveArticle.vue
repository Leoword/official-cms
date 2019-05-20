<template>
	<editor
		:article="article" @upload-article="updateRetrive"
		:category="category" :content="article.text" ref="editor"
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
				lang: '',
				abstract: '',
				text: '',
				author: this.$store.state.user.username
			},
			origin: null,
			category: {
				origin: [],
				list: [],
				selected: []
			}
		};
	},
	computed: {
		articleId() {
			return this.$route.params.id;
		},
		lang() {
			return this.$route.query.lang;
		}
	},
	methods: {
		getRetrive() {
			this.$api.article.get(this.articleId, {
				lang: this.lang
			}).then(res => {
				this.article = res.data;
				this.origin = Object.assign({}, this.article);

				this.getClassification();
			});
		},
		updateRetrive() {
			this.article.text = this.$refs.editor.getCode();

			if (JSON.stringify({
				title: this.article.title, abstract: this.article.abstract,
				text: this.article.text
			}) === JSON.stringify({
				title: this.origin.title, abstract: this.origin.abstract,
				text: this.origin.text
			})) {
				this.updateClassification();
				this.$router.push('/article');
			} else {
				this.$api.article.createCommit({
					articleId: this.articleId,
					commit: this.article
				}).then(() => {
					this.updateClassification();
				}).then(() => {
					this.$router.push('/article');
				});
			}
		},
		getCategoryList() {
			this.$api.category.getList().then(res => {
				this.category.list = res.data.map(category => {
					return {text: category.name, value: category.id}
				});
			});
		},
		getClassification() {
			this.$api.article.getClassificationList(this.articleId).then(res => {
				res.data.forEach(id => {
					this.category.selected.push(id);
					this.category.origin.push(id);
				})
			})
		},
		updateClassification() {
			const {selected, origin} = this.category;

			const newClassification = selected.filter(id => {
				return origin.indexOf(id) === -1;
			});

			const deleteClassification = origin.filter(id => {
				return selected.indexOf(id) === -1;
			});

			Promise.all(newClassification.map(categoryId => {
				return this.$api.article.createClassification({articleId: this.articleId, categoryId});
			}));

			Promise.all(deleteClassification.map(categoryId => {
				return this.$api.article.deleteClassification({articleId: this.articleId, categoryId});
			}));
		}
	},
	mounted() {
		this.getRetrive();
		this.getCategoryList();
	}
};
</script>
 
