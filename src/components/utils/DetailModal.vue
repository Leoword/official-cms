<template>
	<b-modal
		id="item-detail"
		centered
		ok-title="修改"
		cancel-title="取消"
		:title="itemName"
	>
		<div v-if="isUploadFile">
			<b-form-group
				label="文件标识"
				label-for="file-hash"
			>
				<b-form-input
					id="file-hash"
					disabled
					:value="hash"
					size="sm"
				>
				</b-form-input>
			</b-form-group>
			<b-form-group
				label="文件类型"
				label-for="file-category"
			>
				<b-form-select 
					id="file-category"
					v-model="fileCategorySelected"
					:options="categoryOptions"
					size="sm"
				></b-form-select>
			</b-form-group>
			<b-form-group
				label="文件描述"
				label-for="file-comment"
			>
				<b-form-textarea 
					id="file-comment"
					size="sm"
					rows="3"
				></b-form-textarea>
			</b-form-group>
		</div>

		<div v-if="isSection">
			<b-form-group
				label-for="section-name"
				label="版块名称"
			>
				<b-form-input 
					id="section-name"
					size="sm"
				></b-form-input>
			</b-form-group>

			<b-form-group
				label="版块版式"
				label-for="section-format"
			>
				<b-form-select 
					id="section-format"
					v-model="sectionFormatSelected"
					:options="formatOptions"
					size="sm"
				></b-form-select>
			</b-form-group>

			<b-form-group
				label="配置信息"
				label-for="format-collection"
			>
				<b-form-textarea 
					id="format-collection"
					v-model="collection"
					rows="2"
					size="sm"
				></b-form-textarea>
			</b-form-group>
			<b-form-group 
				label="版块描述" 
				label-for="format-comment"
			>
				<b-form-textarea 
					id="format-comment"
					v-comment="comment"
					placeholder="请输入版块描述"
					rows="2"
					size="sm"
					></b-form-textarea>
			</b-form-group>
		</div>

		<div v-if="isFormat">
			<b-form-group
				label="版式名称"
				label-for="format-name"
			>
				<b-form-input
					id="format-name"
					size="sm"
				></b-form-input>
			</b-form-group>
			<b-form-group
				label="版式描述"
				label-for="format-comment"
			>
				<b-form-textarea 
					id="format-comment"
					size="sm"
					rows="3"
				></b-form-textarea>
			</b-form-group>
		</div>

		<div v-if="isPage">
			<b-form-group
				label-for="page-name"
				label="页面名称"
			>
				<b-form-input id="page-name" size="sm"></b-form-input>
			</b-form-group>
			<b-form-group
				label="页面路径"
				label-for="page-path"
			>
				<b-form-input id="page-path" size="sm"></b-form-input>
			</b-form-group>
			<b-form-group label="页面版块" label-for="page-section">
				<b-form-checkbox-group
					id="page-section"
					v-model="sectionSelected"
					:options="sectionOptions"
				></b-form-checkbox-group>
			</b-form-group>
			<b-form-group
				label="页面描述"
				label-for="page-comment"
			>
				<b-form-textarea 
					id="page-comment"
					size="sm"
					rows="3"
				></b-form-textarea>
			</b-form-group>
		</div>
	</b-modal>
</template>

<script>
export default {
	name: 'detail-modal',
	props: {
		itemName: {
			type: String,
			default: '项目详情'
		},
		isUploadFile: {
			type: Boolean,
			default: false
		},
		isSection: {
			type: Boolean,
			default: false
		},
		isFormat: {
			type: Boolean,
			default: false
		},
		isPage: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			fileCategorySelected: 'a',
			sectionFormatSelected: null,
			categoryOptions: [
				{value: null, text: '未选择' },
				{value: 'a', text: 'option a' },
				{value: 'b', text: 'option b' }
			],
			formatOptions: [
				{value: null, text: '未选择' },
				{value: 'a', text: 'option a' },
				{value: 'b', text: 'option b' }
			],
			hash: 'testtesttest',
			sectionSelected: [],
			sectionOptions: [
				{ text: 'Orange', value: 'orange' },
				{ text: 'Apple', value: 'apple' },
				{ text: 'Pineapple', value: 'pineapple' },
				{ text: 'Grape', value: 'grape' }
			],
		};
	}
};
</script>

