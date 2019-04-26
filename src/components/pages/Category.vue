<template>
	<b-container fluid>
		<h1>类别管理</h1>
		<b-card title="基本信息">
			<b-row>
				<b-col>
					<b-form-group
						label="类别名称"
						label-for="category-name"
					>
						<b-form-input 
							id="category-name"
							v-model="name"
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
							v-model="selected" 
							:options="categoryOptions"
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
							v-model="comment"
							rows="3"
						></b-form-textarea>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-btn v-if="isCreate">重置</b-btn>
					<b-btn v-if="isCreate" variant="primary">创建</b-btn>
					<b-btn v-else variant="primary">创建</b-btn>
				</b-col>
			</b-row>
		</b-card>
		<b-card class="my-4" style="height: 580px;overflow: auto">
			<vue2-org-tree
				:data="items"
				horizontal
				:render-content="renderContent"
				@on-expand="onExpand"
        @on-node-click="onNodeClick"
			></vue2-org-tree>
		</b-card>
	</b-container>
</template>

<script>
import Vue2OrgTree from 'vue2-org-tree';

export default {
	components: { Vue2OrgTree },
	data() {
		return {
			isCreate: true,
			categoryOptions: [
				{ value: null, text: '请选择文件类别' },
				{ vaule: '1111', text: 'option 1' },
				{ value: '2222', text: 'option 2' }
			],
			items: {
				id: 0,
				label: "XXX科技有限公司",
				children: [
					{
						id: 2,
						label: "产品研发部",
						children: [
							{
								id: 5,
								label: "研发-前端"
							},
							{
								id: 6,
								label: "研发-后端"
							},
							{
								id: 9,
								label: "UI设计"
							},
							{
								id: 10,
								label: "产品经理"
							}
						]
					},
					{
						id: 3,
						label: "销售部",
						children: [
							{
								id: 7,
								label: "销售一部"
							},
							{
								id: 8,
								label: "销售二部"
							}
						]
					},
					{
						id: 4,
						label: "财务部"
					},
					{
						id: 9,
						label: "HR人事"
					}
				]
			},
		};
	},
	methods: {
		renderContent(h, data) {
			return data.label;
		},
		onExpand() {

		},
		onNodeClick() {

		}
	}
};
</script>

