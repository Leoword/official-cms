<template>
	<b-container fluid>
		<h1>文章批量删除</h1>
		<b-modal 
			v-if="selectedItems"
			id="modal-center" 
			centered 
			title="删除文章"
			ok-title="删除"
			cancel-title="取消"
		>
			<p class="my-4">确认删除所选中的文章?</p>
		</b-modal>
		<b-row>
			<b-col cols="2">
				<b-form-group
					label="关键字"
					label-for="key"
					label-cols-sm="4"
					label-align-sm="left"
				>
					<b-form-input 
						id="key" 
						v-model="filterByKey"
						size="sm" 
						placeholder="请输入关键字"
					></b-form-input>
				</b-form-group>
			</b-col>
			<b-col cols="4">
				<b-button size="sm" @click="reset">重置</b-button>
				<b-button size="sm" type="submit" variant="primary">查询</b-button>
				<b-button
					v-b-modal.modal-center 
					size="sm"
					variant="danger"
				>
					批量删除
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
		<delete-modal></delete-modal>
		<b-table
			ref="articles"
			small
			hover
			:items="items"
			:current-page="curPage"
			:per-page="perPage"
			:fields="[
				{ key: 'checkbox', label: '' },
				{ key: 'title', label: '文章标题', sortable: true },
				{ key: 'date', label: '发表时间', sortable: true }
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
					:value="data.item.id"
					/>
			</template>
			<template slot="title" slot-scope="data">
				{{ data.index + 1 }} - {{ data.item.title }}
			</template>
			<template slot="date" slot-scope="data">
				{{ data.item.date }}
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
				{
					id: 15,
					title: 'tesindetereminatettesttesttesttest',
					date: new Date()
				},
				{
					id: 16,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 17,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 18,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 19,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 20,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 21,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 22,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 23,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 24,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 25,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 26,
					title: 'esttesttesttestteste',
					date: new Date()
				},
				{
					id: 27,
					title: 'testtesttesttesttest',
					date: new Date()
				},
				{
					id: 28,
					title: 'esttesttesttestteste',
					date: new Date()
				},
			],
			indeterminate: false,
			allSelected: false,
			filterByKey: ''
		};
	},
	computed: {
		rows() {
			return this.items.length;
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
					this.itemSelected.push(item.id);
				});
			}
			this.allSelected = true;
		},
		toggleNone() {
			this.itemSelected = [];
		},
		reset() {
			this.filterByKey = null;
		}
	}
};
</script>

