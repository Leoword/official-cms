<template>
	<b-container fluid>
		<h1 class="mb-5">{{$t('content.deleteArticle.title')}}</h1>
		<b-modal 
			v-if="selectedItems"
			id="modal-center" 
			centered 
			:title="$t('content.deleteArticle.deleteModal.title')"
			:ok-title="$t('content.deleteArticle.deleteModal.ok')"
			:cancel-title="$t('content.deleteArticle.deleteModal.cancel')"
			@ok="deleteArticle"
		>
			<p class="my-4">{{$t('content.deleteArticle.deleteModal.msg')}}</p>
		</b-modal>
		<b-row>
			<b-col cols="3">
				<b-form-group
					:label="$t('content.deleteArticle.keyword')"
					label-for="key"
					label-cols-sm="3"
					label-align-sm="left"
				>
					<b-form-input 
						id="key" 
						v-model="filterByKey"
						size="sm" 
						:placeholder="$t('content.deleteArticle.keywordPlaceholder')"
					></b-form-input>
				</b-form-group>
			</b-col>
			<b-col cols="4">
				<b-button size="sm" @click="reset">{{$t('content.deleteArticle.reset')}}</b-button>
				<b-button size="sm" type="submit" variant="primary">{{$t('content.deleteArticle.search')}}</b-button>
				<b-button
					v-b-modal.modal-center 
					size="sm"
					variant="danger"
				>{{$t('content.deleteArticle.submit')}}
					<b-badge v-if="selectedItems !== 0" variant="light">{{ selectedItems }}</b-badge>
				</b-button>
			</b-col>
			<b-col cols="auto" class="ml-auto">
				<b-pagination
					v-model="curPage"
					size="sm"
					class="m-0"
					:per-page="perPage"
					:total-rows="rows"
					aria-controls="article"
					align="right"
					@change="toggleNone"
				/>
			</b-col>
		</b-row>
		<b-table
			ref="articles"
			small
			hover
			:items="articleList"
			:current-page="curPage"
			:per-page="perPage"
			:fields="[
				{ key: 'checkbox', label: '' },
				{ key: 'title', label: $t('content.deleteArticle.table.title'), sortable: true },
				{ key: 'createdAt', label: $t('content.deleteArticle.table.createdAt'), sortable: true }
			]"
			@sort-changed="toggleNone"
			>
			<template slot="HEAD_checkbox">
				<b-form-checkbox
					v-model="allSelected"
					:indeterminate="indeterminate"
					@change="toggleAll"
				></b-form-checkbox>
			</template>
			<template slot="checkbox" slot-scope="data">
				<b-form-checkbox
					v-model="itemSelected"
					:value="{
						articleId: data.item.articleId,
						lang: data.item.lang
					}"
					/>
			</template>
			<template slot="title" slot-scope="data">
				{{ data.item.title }}
			</template>
			<template slot="createdAt" slot-scope="data">
				{{ format(data.item.createdAt) }}
			</template>
		</b-table>
	</b-container>
</template>

<script>

export default {
	data() {
		return {
			perPage: 20,
			curPage: 1,
			itemSelected: [],
			articleList: [],
			indeterminate: false,
			allSelected: false,
			filterByKey: ''
		};
	},
	computed: {
		rows() {
			return this.articleList.length;
		},
		selectedItems() {
			return this.itemSelected.length;
		}
	},
	watch: {
		itemSelected(newVal) {
			if(newVal.length === 0) {
				this.indeterminate = false;
				this.allSelected = false;
			} else if(newVal.length === this.$refs.articles.computedItems.length) {
				this.indeterminate = false;
				this.allSelected = true;
			} else {
				this.indeterminate = true;
				this.allSelected = false;
			}
		}
	},
	methods: {
		toggleAll(checked) {
			const articles = this.$refs.articles;
			this.itemSelected = [];
			if(checked) {
				articles.computedItems.forEach(item => {
					this.itemSelected.push({
						articleId: item.articleId,
						lang: item.lang
					});
				});
			}
			this.allSelected = true;
		},
		toggleNone() {
			this.itemSelected = [];
		},
		reset() {
			this.filterByKey = null;
		},
		getArticleList() {
			this.$api.article.query().then(res => {
				this.articleList = res.data;
			});
		},
		deleteArticle() {
			Promise.all(this.itemSelected.map(item => {
				console.log(item);
				return this.$api.article.delete(item.articleId, item.lang);
			})).then(() => {
				this.$router.push('/article');
			});
		}
	},
	mounted() {
		this.getArticleList();
	}
};
</script>

