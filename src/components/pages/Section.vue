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
								v-model="name"
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
								v-model="selectedFormat"
								:options="formatOptions"
							></b-form-select>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
							<b-form-group
								label="配置信息"
								label-for="format-collection"
							>
								<b-form-textarea 
									id="format-collection"
									v-model="collection"
									rows="2"
								></b-form-textarea>
							</b-form-group>
					</b-col>
					<b-col>
						<b-form-group 
							label="版块描述" 
							label-for="format-comment"
						>
							<b-form-textarea 
								id="format-comment"
								v-comment="comment"
								placeholder="请输入版块描述"
								rows="2"
								></b-form-textarea>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-button class="mr-2">重置</b-button>
						<b-button type="submit" class="mr-2" variant="primary">创建</b-button>
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
		<detail-modal
			item-name="版块详情"
			is-section
		></detail-modal>
		<delete-modal
			model-title="版块删除"
			message="确认删除该版块?"
		></delete-modal>
		<b-table 
			id="format"
			hover
			:items="items"
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
				>
					{{ data.item.name }}
				</b-button>
			</template>
			<template slot="action">
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
	components: { DeleteModal, DetailModal },
	data() {
		return {
			curPage: 1,
			perPage: 8,
			items: [
				{ name: '1111', createdAt: new Date() }
			],
			selectedFormat: null,
			formatOptions: [
				{ value: null, text: '未选择版式' },
				{ value: 'a', text: 'option A'}
			],
			collection: '{}'
		};
	}
};
</script>