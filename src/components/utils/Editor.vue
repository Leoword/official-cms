<template>
	<div id="editor" class="h-100">
		<b-form inline id="top" class="border-bottom border-secondary py-2 px-3">
			 <label class="mr-sm-2" for="article-title">文章题目</label>
			 <b-form-input
					id="article-title"
					size="sm" class="float-left" style="width: 10em"
					placeholder="文章题目"
					v-model="article.title"
				></b-form-input>
				<b-dropdown 
					size="sm"
					text="分类" 
					variant="link"
					class="ml-sm-5 mr-sm-2" style="font-size: 16px"
					>
					<b-form-group>
						<b-form-checkbox-group v-model="category.selected"
							:options="category.list">
						</b-form-checkbox-group>
					</b-form-group>
				</b-dropdown>
				<label class="ml-sm-5 mr-sm-2" for="language">语言</label>
				<b-form-select
					id="language" 
					v-model="languageOptions.selected"
					size="sm"
					:options="languageOptions.list"
				></b-form-select>
			<b-badge 
				v-if="editState === 0" 
				variant="warning"
				class="ml-sm-5 mr-sm-2"
			>未编辑</b-badge>
			<b-badge 
				v-else
				variant="danger"
				class="ml-sm-5 mr-sm-2"
			>已编辑</b-badge>
			<b-dropdown 
				id="abstract" 
				ref="dropdown" 
				text="文章摘要" 
				variant="link"
				class="mr-sm-2"
			>
				<b-dropdown-form 
					style="width: 350px"
				>
					<b-form-textarea
						id="textarea"
						v-model="article.abstract"
						size="sm"
						placeholder="请输入文章摘要" class="mb-3"
						rows="5" style="display: block;width: 100%"
					/>
					<b-button variant="primary" size="sm" @click="onClick">完成</b-button>
				</b-dropdown-form>
			</b-dropdown>
			<b-btn size="sm" variant="primary" class="ml-5" @click="upload">上传</b-btn>
		</b-form>
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
</template>

<script>
import * as brace from 'brace';
import 'brace/ext/modelist';
import 'brace/ext/themelist';

import ISO6391 from '@ovl/iso-639-1';

const lang = new ISO6391();

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
		article: {
			type: Object,
			default: null
		},
		category: {
			type: Object,
			default: null
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
			languageOptions: {
				list: [],
				selected: 'Chinese'
			},
		};
	},
	computed: {
		editState() {
			if(this.article.abstract.length === 0) {
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
		setTimeout(this.updateCode, 1000);
		editor.setOption('wrap', 'free');
		editor.setOption('selectionStyle', 'text');
		editor.getSession().setTabSize(2);

		this.setLanguageOption();
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
		getCode() {
			return editor.getValue();
		},
		updateCode() {
			editor.setValue(this.content, true);
		},
		onClick() {
			this.$refs.dropdown.hide(true);
		},
		setLanguageOption() {
			lang.getAllNames().forEach(name => {
				this.languageOptions.list.push({
					text: name, value: name
				});
			});
		},
		upload() {
			this.$emit('upload-article', this.languageOptions.selected);
		}
	}
};
</script>

<style lang="less">
.preview {
	word-wrap:break-word;
	// overflow-y: scroll;
}
</style>

