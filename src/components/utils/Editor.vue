<template>
	<div id="editor" class="h-100">
		<b-row class="mt-4">
			<b-col cols="5">
				<b-form-group
					label-for="article-title"
					label-cols-sm="3"
					label-align-sm="right"
					:label="$t('content.article.title')"
				>
					<b-form-input
							id="article-title"
							v-model="article.title"
							size="sm"
							:placeholder="$t('content.article.title')"
						></b-form-input>
				</b-form-group>
			</b-col>
			<b-col cols="3">
				<b-form-group
					:label="$t('content.article.lang')"
					label-for="language"
					label-cols-sm="3"
					label-align-sm="right"
				>
					<b-form-select
						id="language"
						v-model="article.lang"
						size="sm"
						:options="languageOptions.list"
					></b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="4">
				<b-row>
					<b-col cols="auto">
						<b-dropdown 
							:text="$t('content.article.category')" 
							variant="link"
							>
							<b-form-group>
								<b-form-checkbox-group 
									v-model="category.selected"
									:options="category.list"
								></b-form-checkbox-group>
							</b-form-group>
						</b-dropdown>
					</b-col>
					<b-col cols="auto">
						<b-badge 
							v-if="editState === 0" 
							variant="warning"
							>{{$t('content.article.abstractState.unedit')}}</b-badge>
						<b-badge 
							v-else
							variant="success"
							>{{$t('content.article.abstractState.edited')}}</b-badge>
						<b-dropdown 
							id="abstract" 
							ref="dropdown" 
							:text="$t('content.article.abstract.name')" 
							variant="link"
						>
							<b-dropdown-form 
								style="width: 350px"
							>
								<b-form-textarea
									id="textarea"
									v-model="article.abstract"
									size="sm"
									:placeholder="$t('content.article.abstract.placeholder')" 
									rows="5" 
									style="display: block;width: 100%"
								/>
								<b-button 
									variant="primary" 
									size="sm"
									class="mt-2 pull-right" 
									@click="onClick">{{$t('content.article.abstract.submit')}}</b-button>
							</b-dropdown-form>
						</b-dropdown>
					</b-col>
					<b-col cols="auto">
						<b-btn size="sm" variant="primary" @click="upload">{{$t('content.article.submit')}}</b-btn>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row class="h-100 p-0 m-0">
			<b-col cols="6" class="m-0 p-0">
				<div id="ace-editor" class="h-100"></div>
			</b-col>
			<b-col cols="6" class="h-100 m-0 p-0">
				<div
					class="preview markdown-body h-100 p-1 border-top"
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
				list: []
			},
		};
	},
	computed: {
		editState() {
			if(!this.article.abstract && this.article.abstract.length === 0) {
				return 0;
			} 
			return 1;
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
			let themeObj = themelist.themesByName['twilight'];
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
			// lang.getAllNames().forEach(name => {
			// 	this.languageOptions.list.push({
			// 		text: name, value: lang.getCode(name)
			// 	});
			// });

			this.languageOptions.list = [
				{
					text: 'Chinese',
					value: lang.getCode('Chinese')
				},
				{
					text: 'English',
					value: lang.getCode('English')
				}
			]
		},
		upload() {
			this.$emit('upload-article');
		},
	}
};
</script>

<style lang="less">
#editor {
	overflow: hidden;
}
.preview {
	word-wrap:break-word;
	overflow-y: auto;
}
</style>

