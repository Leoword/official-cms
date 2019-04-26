<template>
	<div id="editor" class="h-100">
		<div id="top" class="border-bottom border-secondary">
			<b-row class="mt-2 mb-0">
				<b-col class="ml-auto" cols="auto">
					<b-form-group 
						label="文章题目" 
						label-for="article-title"
						label-cols-sm="4"
						label-align-sm="right"
					>
						<b-form-input
							id="article-title"
							size="sm"
							placeholder="文章题目"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col class="ml-auto" cols="auto">
					<b-form-group 
						label="文章类别"
						label-for="article-category"
						label-cols-sm="6"
						label-align-sm="right"
					>
						<b-form-select
							id="article-category"
							v-model="selectedCategory"
							size="sm"
							:options="categoryOptions"
							></b-form-select>
					</b-form-group>
				</b-col>
				<b-col class="ml-auto" cols="auto">
					<b-form-group 
						label="语言" 
						label-for="language"
						label-cols-sm="5"
						label-align-sm="right"
					>
						<b-form-select
							id="language" 
							v-model="selectedLanguage"
							size="sm"
							:options="languageOptions"
						></b-form-select>
					</b-form-group>
				</b-col>
				<b-col class="ml-auto" cols="auto">
					<b-badge 
						v-if="editState === 0" 
						variant="warning"
					>未编辑</b-badge>
					<b-badge 
						v-else
						variant="danger"
					>已编辑</b-badge>
					<b-dropdown 
						id="abstract" 
						ref="dropdown" 
						text="文章摘要" 
						variant="link"
					>
						<b-dropdown-form 
							class="m-2" 
							style="width: 350px"
						>
							<b-form-group 
								label="文章摘要" 
								label-for="textarea"
							>
								<b-form-textarea
									id="textarea"
									v-model="abstract"
									size="sm"
									placeholder="请输入文章摘要"
									rows="3"
								/>
							</b-form-group>
							<b-button variant="primary" size="sm" @click="onClick">完成</b-button>
						</b-dropdown-form>
					</b-dropdown>
				</b-col>
				<b-col class="ml-auto" cols="auto">
					<b-btn size="sm" variant="primary">创建</b-btn>
				</b-col>
			</b-row>
		</div>
		<div id="workbench" class="h-100">
			<b-row class="h-100 p-0 m-0">
				<b-col cols="6" class="m-0 p-0">
					<div id="ace-editor" class="h-100"></div>
				</b-col>
				<b-col cols="6" class="h-100 m-0 p-0">
					<div
						class="preview markdown-body h-100 p-1 border-left border-secondary"
						v-html="htmlCache"	
					/>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
import * as brace from 'brace';
import 'brace/ext/modelist';
import 'brace/ext/themelist';

import Markdown from 'markdown-it';
const modelist = brace.acequire('ace/ext/modelist');
const themelist = brace.acequire('ace/ext/themelist');

const md = new Markdown();
var editor;

export default {
	name: 'editor',
	model: {
		prop: 'code',
		event: 'update'
	},
	props: {
		modalTitle: {
			type: String,
			default: '创建文章'
		},
		okTitle: {
			type: String,
			default: '创建'
		},
		content: {
			type: String,
			default: '## 请开始编辑文章'
		}
	},
	data() {
		return {
			htmlCache: '',
			abstract: '',
			languageOptions: [
				{ text: '未分类', value: 'unkown'},
				{ text: '中文', value: 'CH'},
				{ text: '英文', value: 'EN'},
			],
			categoryOptions: [
				{ value: null, text: '请选择类别' },
				{ value: 'a', text: 'A' },
			],
			selectedLanguage: 'unkown',
			selectedCategory: null,
		};
	},
	computed: {
		editState() {
			if(this.abstract.length === 0) {
				return 0;
			} else {
				return 1;
			}
		}
	},
	watch: {
		code() {
			this.updateCode();
		}
	},
	mounted() {
		editor = brace.edit('ace-editor');
		this.setMode();
		this.setTheme();
		editor.$blockScrolling = Infinity;
		editor.setFontSize('12px');
		editor.setHighlightActiveLine(true);
		editor.getSession().on('change', this.emitCode);
		editor.setReadOnly(false);
		this.updateCode();
		editor.setOption('wrap', 'free');
		editor.setOption('selectionStyle', 'text');
		editor.getSession().setTabSize(2);
	},
	methods: {
		setMode() {
			let modeObj = modelist.modesByName['markdown'];
			if(modeObj) {
				require('brace/mode/' + modeObj.name);
				editor.getSession().setMode(modeObj.mode);
			}
		},
		setTheme() {
			let themeObj = themelist.themesByName['github'];
			if(themeObj) {
				require('brace/theme/' + themeObj.name);
				editor.setTheme(themeObj.theme);
			}
		},
		emitCode() {
			const content = editor.getValue();
			this.htmlCache = md.render(content);
		},
		updateCode() {
			editor.setValue(this.content, true);
		},
		onClick() {
			this.$refs.dropdown.hide(true);
		}
	}
};
</script>

<style lang="less">
.preview {
	word-wrap:break-word;
	overflow-y: scroll;
}
</style>

