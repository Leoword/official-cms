<template>
	<b-container fluid>
		<h1>页面管理</h1>
		<b-card title="页面创建">
			<b-row>
				<b-col class="custom-col">
					<b-form-group
						label="页面名称"
						label-for="page-name"
					>
						<b-form-input 
							v-model="name"
							placeholder="页面名称"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label="页面路径"
						label-for="page-path"
					>
						<b-form-input
							id="page-path"
							v-model="path"
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-form-group label="页面版块" label-for="page-section">
						<b-form-checkbox-group
							id="page-section"
							v-model="sectionSelected"
							:options="sectionOptions"
						></b-form-checkbox-group>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-form-group 
						label="页面描述"
						label-for="page-comment"
					>
						<b-form-textarea 
							id="page-comment"
							v-model="comment"
							rows="3"
						></b-form-textarea>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-btn class="mr-2">重置</b-btn>
					<b-btn class="mr-2" variant="primary">创建</b-btn>
				</b-col>
			</b-row>
		</b-card>
		<b-row class="my-2">
			<b-col 
				cols="auto" 
				class="ml-auto"
			>
				<b-pagination
					v-model="curPage"
					:per-page="perPage"
					:total-rows="rows"
				></b-pagination>
			</b-col>
		</b-row>
		<detail-modal
			item-name="页面详情"
			is-page
		></detail-modal>
		<delete-modal
			model-title="删除页面"
			message="确认删除该页面?"
		></delete-modal>
		<b-table
			id="page"
			hover
			:items="items"
			:current-page="curPage"
			:per-page="perPage"
			:fields="[
				{ key: 'name', label: '页面名称' },
				{ key: 'path', label: '页面路径' },
				{ key: 'createdAt', label: '创建时间', sortable: ture },
				{ key: 'action', label: '操作'}
			]"
		>
			<template slot="name" slot-scope="data">
				<b-button
					v-b-modal.item-detail
					variant="link"
				>
					{{ data.item.name }}
				</b-button>
			</template>
			<template slot="action">
				<i 
					v-b-modal.delete-item
					class="fa fa-trash fa-lg text-danger"
					aria-hidden="true"
					@click="deletePage"
				></i>
			</template>
		</b-table>
	</b-container>
</template>

<script>
import DeleteModal from '../utils/DeleteModal.vue';
import DetailModal from '../utils/DetailModal.vue';

export default {
	components: { DeleteModal, DetailModal },
	data() {
		return {
			curPage: 1,
			perPage: 8,
			sectionSelected: [],
			sectionOptions: [
				{ text: 'Orange', value: 'orange' },
				{ text: 'Apple', value: 'apple' },
				{ text: 'Pineapple', value: 'pineapple' },
				{ text: 'Grape', value: 'grape' }
			],
			items: [
				{ name: '1111', path: 'http://localhost:8080/#/page', createdAt: new Date() },
				{ name: '2222', path: 'http://localhost:8080/#/page1', createdAt: new Date() }
			]
		};
	},
	computed: {
		rows() {
			return this.items.length;
		}
	},
	methods: {
		deletePage() {

		}
	}
};
</script>
