<template>
	<b-container fluid>
		<h1>文件上传管理</h1>
		<b-card title="文件上传">
			<b-form ref="uploadFile">
				<b-row>
						<b-col 
						class="custom-col" 
						cols="auto"
					>
						<b-form-group
							label="文件类型"
							label-for="file-category"
							>
							<b-form-select
								id="file-category"
								v-model="selected"
								:options="categoryOptions"
								></b-form-select>
						</b-form-group>
					</b-col>
					<b-col 
						class="custom-col" 
						cols="4"
					>
						<b-form-group 
							label="浏览文件"
							label-for="upload"
						>
							<b-form-file
								id="upload"
								v-model="file"
								:state="Boolean(file)"
								placeholder="请选择文件"
								class="mb-2"
								size="sm"
								/>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-form-group 
							label="文件描述"
							label-for="file-comment"
						>
							<b-form-textarea
								id="file-comment"
								v-model="uploadfile.comment"
								placeholder="请输入文件描述"
								rows="3"
								></b-form-textarea>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-button 
							class="mr-2" 
							@click="file = null">重置</b-button>
						<b-button class="mr-2" @click="onSubmit">上传</b-button>
					</b-col>
				</b-row>
			</b-form>
		</b-card>
		<b-row>
			<b-col cols="3">
				<b-form-group 
					label="关键字"
					label-for="key"
				>
					<b-form-input
						v-model="key" 
						size="sm"
						class="mb-2"
					></b-form-input>
				</b-form-group>
			</b-col>
			<b-col 
				class="mt-4" 
				cols="2"
			>
				<b-button class="mr-2" @click="onReset">重置</b-button>
				<b-button class="mr-2">查询</b-button>
			</b-col>
			<b-col 
				class="mt-4" 
				cols="4"
			>
				<b-pagination
					v-model="curPage"
					:per-page="perPage"
					:total-rows="rows"				
				></b-pagination>
			</b-col>
		</b-row>
		<detail-modal
			item-name="已上传文件详情"
			is-upload-file
		></detail-modal>
		<delete-modal
			model-title="删除文件"
			message="确认删除该文件?"
		></delete-modal>
		<b-table 
			id="uploaded"
			hover
			:items="items"
			:current-page="curPage"
			:fields="fields"
			:per-page="perPage"
		>
			<template 
				slot="name" 
				slot-scope="data"
			>
				<b-button 
					v-b-modal.item-detail
					variant="link"
				>
					{{ data.item.name }}
				</b-button>
			</template>
			<template slot="actions">
				<i 
					v-b-modal.delete-item
					class="fa fa-trash fa-lg text-danger"
					aria-hidden="true"
					@click="deleteFile"
				></i>
			</template>
		</b-table>
	</b-container>
</template>

<script>
import DeleteModal from '../utils/DeleteModal.vue';
import DetailModal from '../utils/DetailModal.vue';

export default {
	name: 'upload-file',
	components: { DeleteModal, DetailModal },
	data() {
		return {
			uploadfile: {
				type: '',
				comment: '',
				file: Object
			},
			key: '',
			curPage: 1,
			perPage: 8,
			fields: [
				{
					key: 'name',
					label: '文件名',
					sortable: true
				},
				{
					key: 'category',
					label: '文件类别'
				},
				{
					key: 'createdAt',
					label: '创建时间',
					sortable: true
				},
				{
					key: 'actions',
					label: '操作'
				}
			],
			items: [
				{
					id: 1,
					name: 'file1.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 2,
					name: 'file2.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 1,
					name: 'file1.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 2,
					name: 'file2.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 1,
					name: 'file1.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 2,
					name: 'file2.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 1,
					name: 'file1.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 2,
					name: 'file2.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 1,
					name: 'file1.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 2,
					name: 'file2.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 1,
					name: 'file1.txt',
					category: '文本',
					createdAt: new Date()
				},
				{
					id: 2,
					name: 'file2.txt',
					category: '文本',
					createdAt: new Date()
				},
			],
			file: null,
			selected: null,
			categoryOptions: [
				{ value: null, text: '请选择文件类别' },
				{ value: 'a', text: 'option a' },
			],
			comment: ''
		};
	},
	computed: {
		rows() {
			return this.items.length;
		}
	},
	methods: {
		onSubmit() {
			
		},
		onReset() {
			this.key = '';
		},
		deleteFile() {
			
		}
	}
};
</script>

