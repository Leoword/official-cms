<template>
	<b-container fluid>
		<h1>版块管理</h1>
		<b-card title="创建版块">
			<b-form ref="createdSection">
				<b-row>
					<b-col
						class="custom-col"
						cols="auto"
					>
						<b-form-group
							label="版块名称"
							label-for="section-name"
						>
							<b-form-input
								id="section-name"
								v-model="section.name"
								placeholder="板块名称"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col class="custom-col" cols="auto">
						<b-form-group
							label="版块版式"
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
								label="配置信息"
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
							label="版块描述" 
							label-for="section-comment"
						>
							<b-form-textarea 
								id="section-comment"
								v-model="section.comment"
								placeholder="请输入版块描述"
								rows="2"
								></b-form-textarea>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<span v-if="isError" class="pull-left text-danger">
							版块创建失败！
						</span>
					</b-col>
					<b-col class="ml-auto pull-right" cols="auto">
						<b-button class="mr-2" @click="reset(section)">重置</b-button>
						<b-button class="mr-2" variant="primary" @click="onSubmit">创建</b-button>
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
			ok-title="修改"
			cancel-title="取消"
			title="版块管理"
			@ok="updateSectionById()"
		>
			<b-form-group
				label-for="section-name"
				label="版块名称"
			>
				<b-form-input 
					id="section-name"
					v-model="sectionById.name"
					size="sm"
				></b-form-input>
			</b-form-group>

			<b-form-group
				label="版块版式"
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
				label="配置信息"
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
				label="版块描述" 
				label-for="section-comment"
			>
				<b-form-textarea 
					id="section-comment"
					v-model="sectionById.comment"
					placeholder="请输入版块描述"
					rows="3"
					size="sm"
					></b-form-textarea>
			</b-form-group>
		</b-modal>
		<delete-modal
			model-title="版块删除"
			message="确认删除该版块?"
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
				collection: '{}'
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