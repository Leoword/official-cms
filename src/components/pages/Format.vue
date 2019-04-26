<template>
	<b-container fluid>
		<h1>版式管理</h1>
		<b-card title="创建版式">
			<b-form ref="createdFormat">
				<b-row>
					<b-col 
						class="custom-col" 
						cols="auto"
					>
						<b-form-group
							label="版式名称"
							label-for="format-name"
						>
							<b-form-input
								id="format-name"
								v-model="format.name"
								placeholder="版式名称"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-form-group
							label="版式描述"
							label-for="format-comment"
						>
							<b-form-textarea 
								id="format-comment"
								v-model="format.comment"
								placeholder="请输入版式描述"
								rows="3"
							></b-form-textarea>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-button class="mr-2">重置</b-button>
						<b-button 
							@click="onSubmit" 
							class="mr-2" 
							variant="primary">确定</b-button>
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
			is-format
		></detail-modal>
		<delete-modal
			model-title="版式删除"
			message="确认删除该版式?"
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
				<b-btn
					v-b-modal.item-detail
					variant="link"
				>{{ data.item.name }}</b-btn>
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
			format: {
				name: '',
				comment: ''
			}
		};
	},
	computed: {
		rows() {
			return this.items.length;
		}
	},
	methods: {
		onSubmit() {
			this.$api.format.create(this.format).then(({data}) => {
				
			}).catch(e => {
				console.log(e);
			});
		},
		deleteFile() {
			
		}
	}
};
</script>

