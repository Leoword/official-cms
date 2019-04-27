<template>
	<editor
		:article="article" @upload-article="updateRetrive"
		:category="category" :code="article.content"
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
				language: '',
				abstract: '',
				content: ''
			},
			category: {
				origin: [],
				list: [],
				selected: []
			},
			categoryList: [],
			articleId: null
		}
	},
	computed: {
		languageId() {
			return this.$route.params.id
		},
		catgeoryCheckbox() {
			this.categoryList.forEach(({name, id}) => {
				this.category.list.push({
					text: name, value: id
				});

				this.category.selected.push(id);
			});
		}
	},
	methods: {
		getRetrive() {
			this.$api.language.get(this.languageId).then(res => {
				this.article = res.data;
				this.articleId = res.data.hash;
				this.getClassification();
			});
		},
		updateRetrive() {
			this.$api.language.update(this.languageId, this.article).then(res => {
				this.updateClassification();
				this.getRetrive();
			});
		},
		getCategoryList() {
			this.$api.category.getList().then(res => {
				this.categoryList = res.data;
			});
		},
		getClassification() {
			this.$api.getClassificationList(this.articleId).then(res => {
				res.data.forEach(category => {
					this.category.selected.push(category.id);
					this.category.origin.push(category.id);
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
 
