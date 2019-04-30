<template>
	<b-container fluid>
		<h1>{{ $t('content.format.title') }}</h1>
		<b-card :title="$t('content.format.create')">
			<b-form ref="createdFormat">
				<b-row>
					<b-col 
						class="custom-col" 
						cols="auto"
					>
						<b-form-group
							:label="$t('content.format.name')"
							label-for="format-name"
						>
							<b-form-input
								id="format-name"
								v-model="format.name"
								:placeholder="$t('content.format.name')"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-form-group
							:label="$t('content.format.comment')"
							label-for="format-comment"
						>
							<b-form-textarea 
								id="format-comment"
								v-model="format.comment"
								:placeholder="$t('content.format.placeholder')"
								rows="3"
							></b-form-textarea>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="auto">
						<span v-if="createError" class="pull-left text-danger">
							{{$t('content.format.errorMsg')}}
						</span>
					</b-col>
					<b-col class="ml-auto pull-right" cols="auto">
						<b-button 
							class="mr-2" 
							@click="reset(format)">{{$t('content.format.reset')}}</b-button>
						<b-button 
							class="mr-2" 
							variant="primary"
							@click="onSubmit">{{$t('content.format.submit')}}</b-button>
					</b-col>
				</b-row>
			</b-form>
		</b-card>
		<b-modal 
			id="item-detail"
			centered
			:ok-title="$t('content.format.update')"
			:cancel-title="$t('content.format.cancel')"
			:title="$t('content.format.detail')"
			@ok="updateFormatById()"
		>
			<b-form-group
				:label="$t('content.format.name')"
				label-for="format-name"
			>
				<b-form-input
					id="format-name"
					v-model="formatById.name"
					size="sm"
				></b-form-input>
			</b-form-group>
			<b-form-group
				:label="$t('content.format.comment')"
				label-for="format-comment"
			>
				<b-form-textarea 
					id="format-comment"
					v-model="formatById.comment"
					size="sm"
					rows="3"
				></b-form-textarea>
			</b-form-group>
			<span v-if="updateError" class="pull-left text-danger">
				版式更新失败！
			</span>
		</b-modal>
		<delete-modal
			:model-title="$t('content.format.deteleModal.title')"
			:message="$t('content.format.deteleModal.msg')"
			@ok="deleteFormat(deleteId)"
		></delete-modal>
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
		<b-table 
			id="format"
			hover
			small
			:current-page="curPage"
			:per-page="perPage"
			:fields="[
				{ key: 'name', label: '版式名称' },
				{ key: 'createdAt', label: '创建时间', sortable: true },
				{ key: 'action', label: '操作' }

			]"
			:items="formatList"
		>
			<template slot="HEAD_name">{{$t('content.format.name')}}</template>
			<template slot="HEAD_createdAt">{{$t('content.format.createdAt')}}</template>
			<template slot="HEAD_action">{{$t('content.format.action')}}</template>
			<template slot="name" slot-scope="data">
				<b-button
					v-b-modal.item-detail
					variant="link"
					@click="getFormatById(data.item.id)"
				>{{ data.item.name }}</b-button>
			</template>
			<template slot="action" slot-scope="data">
				<i 
					v-b-modal.delete-item
					class="fa fa-trash fa-lg text-danger"
					aria-hidden="true"
					@click="getFormatId(data.item.id)"
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
			format: {
				name: '',
				comment: ''
			},
			formatList: [],
			createError: false,
			updateError: false,
			deleteError: false,
			deleteId: '',
			formatById: {
				id: '',
				name: '',
				comment: ''
			}
		};
	},
	computed: {
		rows() {
			return this.formatList.length;
		}
	},
	mounted() {
		this.getFormatList();
	},
	methods: {
		getFormatList() {
			return this.$api.format.getList().then(res => {
				this.formatList = res.data;
				this.reset(this.format);
			});
		},
		onSubmit() {
			this.$api.format.create(this.format).then(() => {
				this.getFormatList();
			}).catch(e => {
				if(e) {
					this.createError = true;
				}
			});
		},
		deleteFormat(id) {
			return this.$api.format.delete(id).then(() => {
				this.getFormatList();
			}).catch(e => {
				if(e) {
					this.deleteError = true;
				}
			});
		},
		getFormatById(id) {
			return this.$api.format.get(id).then(res => {
				this.formatById.id = res.data.id;
				this.formatById.name = res.data.name;
				this.formatById.comment = res.data.comment;
			});
		},
		updateFormatById() {
			return this.$api.format.update(this.formatById).then(() => {
				this.getFormatList();
				this.reset(this.formatById);
			}).catch(e => {
				if(e) {
					this.updateError = false;
				}
			});
		},
		getFormatId(id) {
			this.deleteId = id;
		},
		reset(format) {
			format.name = '';
			format.comment = '';
			format.id = '';
		}
	}
};
</script>

