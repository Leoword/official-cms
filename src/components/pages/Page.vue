<template>
	<b-container fluid>
		<h1 class="mb-5">{{$t('content.page.title')}}</h1>
		<b-row>
			<b-col>
				<b-card :title="$t('content.page.create')">
					<b-form-group
						:label="$t('content.page.name')"
						label-for="page-name"
					>
						<b-form-input 
							v-model="page.name"
							:placeholder="$t('content.page.placeholder')"
							size="sm"
						></b-form-input>
					</b-form-group>
					<b-form-group
						:label="$t('content.page.path')"
						label-for="page-path"
					>
						<b-form-input
							id="page-path"
							v-model="page.path"
							size="sm"
							:placeholder="$t('content.page.path')"
						></b-form-input>
					</b-form-group>
					<b-form-group :label="$t('content.page.section')" label-for="page-section">
						<b-form-checkbox-group
							id="page-section"
							switches
							v-model="page.sectionList"
							:options="sectionOptions" 
						></b-form-checkbox-group>
					</b-form-group>
					<b-form-group 
						:label="$t('content.page.comment')"
						label-for="page-comment"
						class="mt-3"
					>
						<b-form-textarea 
							id="page-comment"
							v-model="page.comment"
							rows="7" 
							size="sm"
							:placeholder="$t('content.page.placeholder')"
						></b-form-textarea>
					</b-form-group>
					<b-btn v-if="selectedPage === null" class="mr-2 pull-right" variant="primary" size="sm" @click="submit">{{$t('content.page.submit')}}</b-btn>
					<b-btn v-else class="mr-2 pull-right" variant="success" size="sm" @click="putPage">{{$t('content.page.update')}}</b-btn>
					<b-btn class="mr-2 pull-right" size="sm" @click="reset">{{$t('content.page.reset')}}</b-btn>
				</b-card>
			</b-col>
			<b-col>
				<b-row class="my-2">
					<b-col 
						cols="auto" 
						class="ml-auto"
					>
						<b-pagination
							v-model="curPage"
							size="sm"
							:per-page="perPage"
							:total-rows="rows"
							class="mb-0"
						></b-pagination>
					</b-col>
				</b-row>
				<delete-modal
					:model-title="$t('content.page.deleteModal.title')"
					:message="$t('content.page.deleteModal.msg')"
					@ok="deleted"></delete-modal>
				<b-table
					id="page"
					hover
					:items="pageList"
					:current-page="curPage"
					:per-page="perPage"
					:fields="[
						{ key: 'name', label: '页面名称' },
						{ key: 'path', label: '页面路径' },
						{ key: 'action', label: '操作'}
					]"
				>
					<template slot="HEAD_name">{{$t('content.page.name')}}</template>
					<template slot="HEAD_path">{{$t('content.page.path')}}</template>
					<template slot="HEAD_action">{{$t('content.page.action')}}</template>
					<template slot="name" slot-scope="data">
						<b-button
							@click="getPage(data.item.id)"
							variant="link"
						>
							{{ data.item.name }}
						</b-button>
					</template>
					<template slot="action" slot-scope="data">
						<i 
							v-b-modal.delete-item
							class="fa fa-trash fa-lg text-danger"
							aria-hidden="true"
							@click="deletePage(data.item.id)"
						></i>
					</template>
				</b-table>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import DeleteModal from '../utils/DeleteModal.vue';

function createPage() {
	return {
		name: '',
		path: '',
		comment: '',
		sectionList: []
	};
}

export default {
	components: { DeleteModal },
	data() {
		return {
			curPage: 1,
			perPage: 8,
			sectionSelected: [],
			sectionList: [],
			pageList: [],
			selectedPage: null,
			page: createPage(),
			delete: null
		};
	},
	computed: {
		rows() {
			return this.pageList.length;
		},
		sectionOptions() {
			return this.sectionList.map(({id, name}) => {
				return {
					text: name, value: id
				};
			});
		},
	},
	methods: {
		getSectionList() {
			this.$api.section.getList().then(res => {
				this.sectionList = res.data;
			});
		},
		getPageList() {
			this.$api.page.getList().then(res => {
				this.pageList = res.data;
			});
		},
		getPage(id) {
			this.pageList.forEach(page => {
				if (page.id === id) {
					this.page = page;
					this.selectedPage = id;
				}
			})
		},
		putPage() {
			this.$api.page.update(this.selectedPage, this.page).then(() => {
				this.selectedPage = null;
				this.getPageList();
				this.page = createPage();
			});
		},
		reset() {
			this.page = createPage();
			this.selectedPage = null;
		},
		submit() {
			const {name, comment, path, sectionList} = this.page;

			if (name && path && sectionList.length !== 0) {
				this.$api.page.create(this.page).then(() => {
					this.selectedPage = null;
					this.getPageList();
					this.page = createPage();
				});
			}
		},
		deletePage(id) {
			this.delete = id;
		},
		deleted() {
			this.$api.page.delete(this.delete).then(() => {
				this.getPageList();
			});
		}
	},
	mounted() {
		this.getSectionList();
		this.getPageList();
	}
};
</script>
