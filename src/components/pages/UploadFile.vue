<template>
	<b-container fluid id="file">
		<h1 class="mb-5">文件上传管理</h1>
		<div class="clearfix float-left" style="width: 40%">
			<div class="clearfix">
				<b-form-file
					v-model="file" style="display: inline; width: auto"
					:state="Boolean(file)"
					placeholder="请选择文件"
					size="sm" plain
				/>
				<b-button 
					class="mr-2" size="sm"
					@click="getBlob">预览</b-button>
				<b-button 
					class="mr-2" size="sm"
					@click="resize">裁剪</b-button>
				<b-button class="mr-2" size="sm" @click="onSubmit">上传</b-button>
			</div>
			<div class="file-preview mt-3">
				<vueCropper
					ref="cropper"
					:img="option.img"
					:outputSize="option.size"
					:outputType="option.outputType"
					:canMove="false"
					:autoCropWidth="200"
					:autoCropHeight="200"
					:centerBox="option.centerBox"
				></vueCropper>
			</div>
		</div>
		<div class="ml-3 float-right" style="width: 56%">
			<h4>文件列表</h4>
			<div v-if="list.length !== 0">
				<div class="clearfix">
					<div class="float-left">
						{{list.lengt}}
						<b-form-select size="sm" v-model="selected" :options="typeList"></b-form-select>
					</div>
					<div class="float-right">
						<b-pagination
							size="sm"
							v-model="currentPage"
							:total-rows="rows"
							:per-page="perPage"
						></b-pagination>
					</div>
				</div>
				 <b-card v-for="(file, index) in renderFileList" :key="index"
						style="width: 23%" no-body class="float-left mr-3 my-3"
						:img-src="`http://localhost:8081${file.url}`" img-top>
						<b-card-text>
							<p class="px-2 mb-0">类型：{{file.type}}</p>
							<p class="px-2 mb-0">路径： {{file.url}}</p>
							<p class="px-2 mb-0 text-right">
								<i 
									v-b-modal.delete-item
									class="fa fa-trash fa-lg text-danger"
									aria-hidden="true"
									@click="deleteFile(file.id)"
								></i>
							</p>
						</b-card-text>
					</b-card>
			</div>
		</div>
		<delete-modal
			model-title="删除文件"
			message="确认删除该文件?"
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
        img: "",
        size: 1,
				outputType: "png"
			},
			perPage: 8,
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
		}
	},
	methods: {
		getBlob() {
			if( !this.file) {
				return;
			}

			const reader = new FileReader();

			reader.onload = ({target}) => {
				this.option.img = target.result;
			}
			
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
					this.$api.file.create(formdata).then(() => this.getFileList());
				});
			} else {
				formdata.append('file', this.file);
				this.$api.file.create(formdata).then(() => this.getFileList());
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


