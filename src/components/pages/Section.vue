z<template>
	<b-container fluid>
		<h1 class="mb-5">{{$t('content.section.title')}}</h1>
		<b-card :title="$t('content.section.create')">
			<b-form ref="createdSection">
				<b-row>
					<b-col
						class="custom-col"
						cols="auto"
					>
						<b-form-group
							:label="$t('content.section.name')"
							label-for="section-name"
						>
							<b-form-input
								id="section-name"
								v-model="section.name"
								:placeholder="$t('content.section.name')"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col class="custom-col" cols="auto">
						<b-form-group
							:label="$t('content.section.format')"
							label-for="section-format"
						>
							<b-form-select
								id="section-format"
								v-model="section.formatId"
								:options="formatOptions"
							></b-form-select>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
							<b-form-group
								:label="$t('content.section.configInfo')"
								label-for="section-collection"
							>
								<b-form-textarea 
									id="section-collection"
									v-model="section.collection"
									rows="2"
								></b-form-textarea>
							</b-form-group>
					</b-col>
					<b-col>
						<b-form-group 
							:label="$t('content.section.comment')" 
							label-for="section-comment"
						>
							<b-form-textarea 
								id="section-comment"
								v-model="section.comment"
								:placeholder="$t('content.section.placeholder')"
								rows="2"
								></b-form-textarea>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<span v-if="isError" class="pull-left text-danger">
							{{$t('content.section.errorMsg')}}
						</span>
					</b-col>
					<b-col class="ml-auto pull-right" cols="auto">
						<b-button class="mr-2" @click="reset(section)">{{$t('content.section.reset')}}</b-button>
						<b-button class="mr-2" variant="primary" @click="onSubmit">{{$t('content.section.submit')}}</b-button>
					</b-col>
				</b-row>
			</b-form>
		</b-card>
		<b-row class="my-2">
			<b-col
				class="ml-auto"
				cols="auto"
			>
				<b-pagination
					v-model="curPage"
					:per-page="perPage"
					:total-rows="rows"
				></b-pagination>
			</b-col>
		</b-row>
		<b-modal 
			id="item-detail"
			centered
			:ok-title="$t('content.section.updateModal.update')"
			:cancel-title="$t('content.section.cancel')"
			:title="$t('content.section.updateModal.title')"
			@ok="updateSectionById()"
		>
			<b-form-group
				label-for="section-name"
				:label="$t('content.section.name')"
			>
				<b-form-input 
					id="section-name"
					v-model="sectionById.name"
					size="sm"
				></b-form-input>
			</b-form-group>

			<b-form-group
				:label="$t('content.section.format')"
				label-for="section-format"
			>
				<b-form-select 
					id="section-format"
					v-model="sectionById.formatId"
					:options="formatOptions"
					size="sm"
				></b-form-select>
			</b-form-group>

			<b-form-group
				:label="$t('content.section.configInfo')"
				label-for="format-collection"
			>
				<b-form-textarea 
					id="format-collection"
					v-model="sectionById.collection"
					rows="3"
					size="sm"
				></b-form-textarea>
			</b-form-group>
			<b-form-group 
				:label="$t('content.section.comment')"
				label-for="section-comment"
			>
				<b-form-textarea 
					id="section-comment"
					v-model="sectionById.comment"
					:placeholder="$t('content.section.placeholder')"
					rows="3"
					size="sm"
					></b-form-textarea>
			</b-form-group>
		</b-modal>
		<delete-modal
			:model-title="$t('content.section.deleteModal.title')"
			:message="$t('content.section.deleteModal.msg')"
			@ok="deleteSection(deleteId)"
		></delete-modal>
		<b-table 
			id="section"
			hover
			small
			:items="sectionList"
			:current-page="curPage"
			:per-page="perPage"
			:fields="[
				{ key: 'name', label: '版式名称' },
				{ key: 'createdAt', label: '创建时间', sortable: true },
				{ key: 'action', label: '操作' }
			]"
		>	
			<template slot="HEAD_name">{{$t('content.section.name')}}</template>
			<template slot="HEAD_createdAt">{{$t('content.section.createdAt')}}</template>
			<template slot="HEAD_action">{{$t('content.section.action')}}</template>
			<template slot="name" slot-scope="data">
				<b-button
					v-b-modal.item-detail
					variant="link"
					@click="getSectionById(data.item.id)"
				>{{ data.item.name }}</b-button>
			</template>
			<template slot="action" slot-scope="data">
				<i 
					v-b-modal.delete-item
					class="fa fa-trash fa-lg text-danger"
					aria-hidden="true"
					@click="getSectionId(data.item.id)"
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
			perPage: 8,
			section: {
				name: '',
				formatId: null,
				comment: '',
				collection: '{"type": "file | article","args": {"category": "","type": "","thumbnail": "","exp": {"limit": 1,"hash": "","title": ""}}}'
			},
			sectionById: {
				id: '',
				name: '',
				formatId: null,
				comment: '',
				collection: ''
			},
			sectionList: [],
			formatOptions: [],
			collectionList: [],
			isError: false,
			deleteId: '',
		};
	},
	computed: {
		rows() {
			return this.sectionList.length;
		}
	},
	mounted() {
		this.getSectionList();
		this.getFormatList();
	},
	methods: {
		parseCollection(collections) {
			this.collectionList = [];
			collections.split(',').forEach(item => {
				this.collectionList.push(JSON.parse(item));
			});
			return this.collectionList;
		},
		onSubmit() {
			const section = {
				name: this.section.name,
				formatId: this.section.formatId,
				comment: this.section.comment,
				collection: this.parseCollection(this.section.collection)
			};
			this.$api.section.create(section).then(() => {
				this.getSectionList();
				this.reset(this.section);
			}).catch(e => {
				if(e) {
					this.isError = true;
				}
			});
		},
		getSectionList() {
			return this.$api.section.getList().then(res => {
				this.sectionList = res.data;
			});
		},
		getFormatList() {
			this.formatOptions = [ {value: null, text: '请选择版式'} ];
			return this.$api.format.getList().then(res => {
				res.data.forEach(item => {
					const option = { value: item.id, text: item.name};
					this.formatOptions.push(option);});
			});
		},
		getSectionById(id) {
			return this.$api.section.get(id).then(res => {
				this.sectionById.id = res.data.id;
				this.sectionById.name = res.data.name;
				this.sectionById.formatId = res.data.format;
				this.sectionById.comment = res.data.comment;
				this.sectionById.collection = JSON.stringify(res.data.collection);
			}).catch(e => {
				if(e) {
					this.isError = true;
				}
			});
		},
		deleteSection(id) {
			return this.$api.section.delete(id).then(() => {
				this.getSectionList();
			}).catch(e => {
				console.log(e);
			});
		},
		updateSectionById() {
			return this.$api.section.update(this.sectionById).then(() => {
				this.getSectionList();
				this.reset(this.sectionById);
			}).catch(e => {
				console.log(e);
			});
		},
		reset(section) {
			section.name = '',
			section.formatId = null,
			section.comment = '';
			section.collection = '';
		},
		getSectionId(id) {
			this.deleteId = id;
		}
	}
};
</script>