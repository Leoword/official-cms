<template>
	<b-container fluid id="file">
		<h1 class="mb-5">{{$t('content.upload.title')}}</h1>
		<div class="clearfix float-left" style="width: 40%">
			<div class="clearfix">
				<b-form-file
					v-model="file" style="display: inline; width: auto"
					:state="Boolean(file)"
					size="sm" plain
				/>
				<b-button 
					class="mr-2" 
					size="sm"
					variant="success"
					@click="getBlob" 
				>{{$t('content.upload.preview')}}</b-button>
				<b-button 
					class="mr-2" 
					size="sm"
					variant="danger"
					@click="resize">{{$t('content.upload.crop')}}</b-button>
			</div>
			<div class="file-preview mt-3">
				<vueCropper
					ref="cropper"
					:outputSize="option.size"
					:outputType="option.outputType"
					:canMove="false"
					:autoCropWidth="200"
					:autoCropHeight="200"
					:centerBox="option.centerBox"
					:img="option.img"
				></vueCropper>
				<b-button class="my-2 pull-right" variant="primary" size="sm" @click="onSubmit">{{$t('content.upload.submit')}}</b-button>
			</div>
		</div>
		<div class="ml-3 float-right" style="width: 58%">
			<h4>{{$t('content.upload.list')}}</h4>
			<div v-if="list.length !== 0">
				<div class="clearfix">
					<div class="float-right">
						<b-pagination
							v-model="currentPage"
							size="sm"
							:total-rows="rows"
							:per-page="perPage"
						></b-pagination>
					</div>
				</div>
				<b-table 
					ref="files"
					small
					hover
					:items="list"
					:current-page="currentPage"
					:per-page="perPage"
					:filter="filterFile"
					:fields="[
						{ key: 'url', label: $t('content.upload.path')},
						{ key: 'type', label: $t('content.upload.category')},
						{ key: 'action', label: $t('content.upload.action')}
					]"
				>
					<template slot="url" slot-scope="data">
						<span
							:id="`show-file-${data.item.id}`"
						>{{data.item.url}}</span>

						<b-popover :target="`show-file-${data.item.id}`" placement="right" triggers="hover focus">
							<span v-if="isShow(data.item.type)">
								<b-img :src="`${data.item.url}`" fluid></b-img>
							</span>
							<span v-else>{{$t('content.upload.notDisplay')}}</span>
						</b-popover>
					</template>
					<template slot="action" slot-scope="data">
						<i 
							v-b-modal.delete-item
							class="fa fa-trash fa-lg text-danger"
							aria-hidden="true"
							@click="deleteFile(data.item.id)"
						></i>
					</template>
				</b-table>
			</div>
		</div>
		<delete-modal
			:model-title="$t('content.upload.deleteModal.title')"
			:message="$t('content.upload.deleteModal.msg')"
			@ok="deleted"
		></delete-modal>
	</b-container>
</template>

<script>
import DeleteModal from '../utils/DeleteModal.vue';

import { VueCropper }  from 'vue-cropper' ;

export default {
	name: 'upload-file',
	components: { DeleteModal, VueCropper },
	data() {
		return {
			file: null,
			list: [],
			option: {
				img: '',
				size: 1,
				outputType: 'png'
			},
			perPage: 20,
			currentPage: 1,
			selected: null,
			delete: null
		};
	},
	computed: {
		rows() {
			return this.filterFile.length;
		},
		typeList() {
			const list = [];
			const typeList = [];

			this.list.forEach(file => {
				if (list.indexOf(file.type) === -1 && file.type) {
					list.push(file.type);

					typeList.push({
						value: file.type, text: file.type
					});
				}
			});

			return typeList.concat([{
				value: null, text: '全部'
			}]);
		},
		renderFileList() {
			return this.filterFile.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
		},
		filterFile() {
			if (!this.selected) {
				return this.list;
			} else {
				return this.list.filter(file => file.type === this.selected);
			}
		},
	},
	methods: {
		getBlob() {
			if( !this.file) {
				return;
			}

			const reader = new FileReader();

			reader.onload = ({target}) => {
				this.option.img = target.result;
			};
			
			reader.readAsDataURL(this.file);
		},
		onSubmit() {
			if (!this.file) {
				return false;
			}

			const type = this.file.type;
			const formdata = new FormData();

			formdata.append('type', type);
			if (this.option.img) {
				this.$refs.cropper.getCropBlob((data) => { 
					formdata.append('file', data);
					this.$api.file.create(formdata).then(() => {
						this.getFileList();
						this.reset();
					});
				});
			} else {
				formdata.append('file', this.file);
				this.$api.file.create(formdata).then(() => {
						this.getFileList();
						this.reset();
					});
			}

		},
		deleteFile(id) {
			this.delete = id;
		},
		deleted() {
			this.$api.file.delete(this.delete).then(() => {
				this.getFileList();
			});
		},
		getFileList() {
			this.$api.file.getList().then(res => {
				this.list = res.data;
			});
		},
		resize() {
			if (this.option.img) {
				this.$refs.cropper.startCrop();
				this.$refs.cropper.goAutoCrop();
			}
		},
		reset() {
			this.file = null;
			if (this.option.img) {
				this.$refs.cropper.clearCrop();
				this.option.img = '';
			}
		},
		isShow(type) {
			const reg = new RegExp('^image\/');
			if(reg.test(type)) {
				return true;
			}

			return false;
		}
	},
	mounted() {
		this.getFileList();
	}
};
</script>

<style lang="less">
.custom-file-input:lang(en) ~ .custom-file-label::after {
	content: "上传";
}

.file-preview {
	width: 90%;
	height: 300px;;
}

#file {
	.card {
		min-height: 350px;
	}
}
</style>


