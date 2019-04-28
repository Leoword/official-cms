<template>
	<b-container fluid>
		<h1>类别管理</h1>
		<delete-modal
			model-title="版块删除"
			message="确认删除该版块?"
			@ok="deleteCategory(deleteId)"
		></delete-modal>
		<b-row>
			<b-col cols="8">
				<b-card title="基本信息">
					<b-row>
						<b-col>
							<b-form-group
								label="类别名称"
								label-for="category-name"
							>
								<b-form-input 
									id="category-name"
									v-model="category.name"
									placeholder="类别名称"
								></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group
								label="所属父类"
								label-for="category-parent"
							>
								<b-form-select
									id="category-parent"
									v-model="category.parent" 
									:options="renderSelectCategory"
								></b-form-select>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b-form-group
								label="类别描述"
								label-for="category-comment"
							>
								<b-form-textarea 
									id="category-comment"
									v-model="category.comment"
									rows="3"
									placeholder="请输入类别描述"
								></b-form-textarea>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col class="ml-auto" cols="auto">
							<b-btn v-if="isCreate" @click="reset">重置</b-btn>
							<b-btn v-if="isCreate" variant="primary" @click="onSubmit">创建</b-btn>
							<b-btn v-if="!isCreate" @click="back">返回创建</b-btn>
							<b-btn v-if="!isCreate" variant="primary" @click="updateCategoryById()">更新</b-btn>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
			<b-col cols="4">
				<b-card title="类别列表" style="height: 338px"> 
					<b-pagination
							v-model="curPage"
							small
							limit="3"
							:per-page="perPage"
							:total-rows="rows"
							align="center"
					></b-pagination>
					<b-table
						id="category"
						hover
						small
						:current-page="curPage"
						:per-page="perPage"
						:fields="[
							{ key: 'name', label: '类别名称'},
							{ key: 'parent', label: '所属父类'},
							{ key: 'action', label: ''}
						]"
						:items="categoryList"
					>
						<template slot="name" slot-scope="data">
							<b-btn
								variant="link"
								@click="getCategoryById(data.item.hash)"
							>{{data.item.name}}</b-btn>
						</template>
						<template slot="parent" slot-scope="data">
							{{ data.item.parent === null ? '无' : indexOf(data.item.parent)}}
						</template>
						<template slot="action" slot-scope="data">
							<i 
								v-b-modal.delete-item
								class="fa fa-trash fa-lg text-danger"
								aria-hidden="true"
								@click="getCategoryId(data.item.hash)"
							></i>
						</template>
					</b-table>
				</b-card>
			</b-col>
		</b-row>
		<b-card class="my-4" style="height: 580px; overflow: auto">
			<vue2-org-tree
				:data="items"
				horizontal
				:render-content="renderContent"
			></vue2-org-tree>
		</b-card>
	</b-container>
</template>

<script>
import Vue2OrgTree from 'vue2-org-tree';
import DeleteModal from '../utils/DeleteModal.vue';

export default {
	components: { Vue2OrgTree, DeleteModal },
	data() {
		return {
			curPage: 1,
			perPage: 4,
			isCreate: true,
			category: {
				id: '',
				name: '',
				parent: null,
				comment: ''
			},
			deleteId: '',
			categoryList: [],
			categoryOptions: [],
			items: {
				id: 0,
				label: 'root',
				children: [
					{
						id: 2,
						label: '产品研发部',
						children: [
							{
								id: 5,
								label: '研发-前端'
							},
							{
								id: 6,
								label: '研发-后端'
							},
							{
								id: 9,
								label: 'UI设计'
							},
							{
								id: 10,
								label: '产品经理'
							}
						]
					},
					{
						id: 3,
						label: '销售部',
						children: [
							{
								id: 7,
								label: '销售一部'
							},
							{
								id: 8,
								label: '销售二部'
							}
						]
					},
					{
						id: 4,
						label: '财务部'
					},
					{
						id: 9,
						label: 'HR人事'
					}
				]
			},
		};
	},
	computed: {
		rows() {
			return this.categoryList.length;
		},
		renderSelectCategory() {
			return this.categoryOptions.filter(category => {
				return category.value !== this.category.id;
			});
		}
	},
	mounted() {
		this.getCategoryOption();
		this.getCategoryList();
	},
	methods: {
		renderContent(h, data) {
			return data.label;
		},
		getCategoryList() {
			return this.$api.category.getList().then(res => {
				this.categoryList = res.data;
			});
		},
		getCategoryOption() {
			this.categoryOptions = [ {value: null, text: '请选择父类'} ];
			return this.$api.category.getList().then(res => {
				res.data.forEach(item => {
					const option = { value: item.hash, text: item.name };
					this.categoryOptions.push(option);
				});
			});
		},
		onSubmit() {
			this.$api.category.create(this.category).then(() => {
				this.getCategoryList();
			}).then(() => {
				this.reset();
			});
		},
		reset() {
			this.category.id = '';
			this.category.name = '';
			this.category.comment = '';
			this.category.parent = null;
		},
		deleteCategory(id) {
			return this.$api.category.delete(id).then(() => {
				this.getCategoryList();
				this.getCategoryOption();
			}).catch(e => {
				console.log(e);
			});
		},
		getCategoryById(id) {
			return this.$api.category.get(id).then(res => {
				this.category.name = res.data.name;
				this.category.comment = res.data.comment;
				this.category.parent = res.data.parent;
				this.category.id = res.data.hash;
			}).then(() => {
				this.isCreate = false;
			});
		},
		getCategoryId(id) {
			this.deleteId = id;
		},
		updateCategoryById() {
			return this.$api.category.update(this.category).then(() => {
				this.getCategoryList();
				this.getCategoryOption();
				this.reset();
			}).then(()=> {
				this.isCreate = true;
			}).catch(e => {
				console.log(e);
			});
		},
		back() {
			this.isCreate = true;
			this.reset();
		},
		indexOf(val) {
			let result;
			this.categoryOptions.forEach(item => {
				if(item.value === val) {
					result = item.text;
				}
			});
			return result;
		}
	}
};
</script>

