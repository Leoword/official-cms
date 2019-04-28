<template>
	<b-modal
		id="delete-item"
		centered
		:title="modelTitle"
		ok-title="确定"
		cancel-title="取消"
		@ok="handleOk"
	>
		<p>{{ message }}</p>
	</b-modal>
</template>

<script>
export default {
	name: 'delete-modal',
	props: {
		modelTitle: {
			type: String,
			default: '确认删除'
		},
		message: {
			type: String,
			default: '确认删除该项目?'
		}
	},
	methods: {
		handleOk() {
			this.$emit('ok');
		}
	}
};
</script>
