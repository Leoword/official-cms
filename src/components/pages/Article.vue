class<template>
			<b-container fluid>
				<h1>文章列表</h1>
				<b-row class="mt-4">
					<b-col cols="2">
						<b-form-group 
							label="关键字"
							label-for="key"
							label-cols-sm="3"
							label-align-sm="left"
						>
							<b-form-input 
								id="key"
								v-model="filterByKey"
								size="sm"
								placeholder="请输入关键字"
								/>
						</b-form-group>
					</b-col>
					<b-col cols="3">
						<b-btn size="sm" @click="reset">重置</b-btn>
						<b-btn size="sm" type="submit" variant="primary">查询</b-btn>
					</b-col>
					<b-col cols="auto" class="ml-auto">
						<b-pagination
							v-model="curPage"
							size="sm"
							:per-page="perPage"
							:total-rows="rows"
							aria-controls="article"
							class="pull-right"
							algin="right"
						/>
					</b-col>
				</b-row>
				
				<b-table
					id="article"
					hover
					:items="items"
					:current-page="curPage"
					:fields="fields"
					:per-page="perPage"
				>
					<template slot="HEAD_title" slot-scope="data">
						<b>{{ data.label }}</b>
					</template>
					<template slot="HEAD_label">
						<b-dropdown 
							size="sm"
							text="排序方式" 
							variant="link"
							style="float: right"
							>
							<b-dropdown-item>创建时间升序排列</b-dropdown-item>
							<b-dropdown-item>创建时间降序排列</b-dropdown-item>
						</b-dropdown>
					</template>

					<template 
						slot="title"
						slot-scope="data"
						>
						<div>
							<b-link :to="`/article/${data.item.id}`">{{ data.item.title }}</b-link>
						</div>
						<div>创建于{{ data.item.date }}</div>
					</template>
				</b-table>
			</b-container>
</template>

<script>
export default {
	data() {
		return {
			perPage: 10,
			curPage: 1,
			fields: [
				{
					key: 'title',
					label: '文章标题',
					sortable: true
				},
				{
					key: 'label'
				}
			],
			items: [
				{
					id: 1,
					title: 'tesindetereminatettesttesttesttest',
					date: new Date()
				},
				{
					id: 2,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 3,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 4,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 5,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 6,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 7,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 8,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 9,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 10,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 11,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 12,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 13,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 14,
					title: 'esttesttesttestteste',
					date: new Date()
				},
			],
			selected: 'all',
			languages: [
				{
					text: '全部',
					value: 'all'
				},
				{
					text: '中文',
					value: 'zh'
				},
				{
					text: '英文',
					value: 'en'
				}
			],
			filterByKey: ''
		};
	},
	computed: {
		rows() {
			return this.items.length;
		}
	},
	methods: {
		reset() {
			this.filterByKey = null;
		}
	}
};
</script>

<style lang="less">

</style>
