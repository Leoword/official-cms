<template>
	<b-container fluid>
		<h1 class="mb-5">{{$t('content.page.title')}}</h1>
		<b-card :title="$t('content.page.baseInfo')">
			<b-form-group
				:label="$t('content.page.name')"
				label-for="page-name"
			>
				<b-form-input 
					id="page-name"
					v-model.trim="page.name"
					:placeholder="$t('content.page.name')"
				></b-form-input>
			</b-form-group>
			<b-form-group
				:label="$t('content.page.config')"
				label-for="page-config"
			>
				<b-form-textarea 
					id="page-config"
					v-model.trim="page.config"
					rows="5"
				></b-form-textarea>
			</b-form-group>
			<b-row>
				<b-col>
					<span v-if="success.create" class="pull-left text-success">
						{{$t('content.page.message.createSuccess')}}
					</span>
					<span v-if="error.create" class="pull-left text-danger">
						{{$t('content.page.message.createFailed')}}
					</span>
					<span v-if="success.update" class="pull-left text-success">
						{{$t('content.page.message.updateSuccess')}}
					</span>
					<span v-if="error.update" class="pull-left text-danger">
						{{$t('content.page.message.updateFailed')}}
					</span>
				</b-col>
				<b-col class="ml-auto" cols="auto">
					<b-btn size="sm" v-if="createState" @click="reset">{{$t('content.page.reset')}}</b-btn>
					<b-btn size="sm" v-if="createState" variant="primary" @click="createPage">{{$t('content.page.create')}}</b-btn>
					<b-btn size="sm" v-if="!createState" @click="back">{{$t('content.page.back')}}</b-btn>
					<b-btn size="sm" v-if="!createState" variant="success" @click="updatePage(page.id)">{{$t('content.page.update')}}</b-btn>
				</b-col>
			</b-row>
		</b-card>
		<delete-modal
			:model-title="$t('content.user.deleteTitle')"
			:message="$t('content.user.deleteMsg')"
			@ok="deletePage(deleteId)"
		></delete-modal>
		<b-row class="mt-3">
			<b-col class="ml-auto" cols="auto">
				<b-pagination
					v-model="curPage"
					size="sm"
					:per-page="perPage"
					:total-rows="rows"
					aria-controls="pages"
					algin="right"
				></b-pagination>
			</b-col>
		</b-row>
		<b-table
			ref="pages"
			small
			hover
			:items="pageList"
			:current-page="curPage"
			:per-page="perPage"
			:fields="[
				{ key: 'name', label: $t('content.page.name')},
				{ key: 'action', label: $t('content.page.action')}
			]"
		>
			<template slot="name" slot-scope="data">
				<b-btn
					variant="link"
					@click="getPageById(data.item.id)"
				>{{data.item.name}}</b-btn>
			</template>
			<template slot="action" slot-scope="data">
				<i 
					v-b-modal.delete-item
					class="fa fa-trash fa-lg text-danger"
					aria-hidden="true"
					@click="getPageId(data.item.id)"
				></i>
			</template>
		</b-table>
	</b-container>
</template>

<script>
import DeleteModal from '../utils/DeleteModal.vue';
export default {
	components: { DeleteModal },
	data() {
		return {
			curPage: 1,
			perPage: 20,
			createState: true,
			error: {
				create: false,
				update: false
			},
			success: {
				create: false,
				update: false
			},
			page: {
				id: null,
				name: '',
				config: '{ "title": "", "description": "", "router": "/", "body": [{ "name": "", "options": "", "classList": ""}]}'
			},
			pageList: [],
			deleteId: null
		};
	},
	mounted() {
		this.getPageList();
	},
	computed: {
		rows() {
			return this.pageList.length;
		}
	},
	methods: {
		reset() {
			this.page.id = null;
			this.page.name = '';
			this.page.config = '{ "title": "", "description": "", "router": "/", "body": [{ "name": "", "options": "", "classList": ""}]}';
		},
		getPageId(id) {
			this.deleteId = id;
		},
		getPageList() {
			return this.$api.page.getList().then(res => {
				this.pageList = res.data;
			});
		},
		createPage() {
			var page = Object.assign(JSON.parse(this.page.config), {name: this.page.name});
			this.$api.page.create(page).then(() => {
				this.error.create = false;
				this.success.create = true;
				this.getPageList();
			}).catch(e => {
				if(e) {
					this.success.create = false;
					this.error.create = true;
				}
			});
		},
		getPageById(id) {
			this.createState = false;
			return this.$api.page.get(id).then(res => {
				this.page.id = res.data.id;
				this.page.name = res.data.name;
				this.page.config = JSON.stringify({
					title: res.data.title,
					description: res.data.description,
					router: res.data.router,
					body: res.data.body
				});
			});
		},
		deletePage(id) {
			return this.$api.page.delete(id).then(() => {
				this.getPageList();
				this.deleteId = null;
			}).catch(e => {
				console.log(e);
			});
		},
		updatePage(id) {
			var page = Object.assign(JSON.parse(this.page.config), {name: this.page.name});
			this.$api.page.update(id, page).then(() => {
				this.error.update = false;
				this.success.update = true;
				this.getPageList();
			}).catch(e => {
				if (e) {
					this.success.update = false;
					this.error.update = true;
				}
			});
		},
		back() {
			this.createState = true;
			this.reset();
		}
	}
};
</script>
