<template>
	<div>
		<b-button 
			v-if="hasSub" 
			v-b-toggle.menu-item
			class="parent p-3 border-bottom border-left" 
			block
			:href="url" 
			variant="light"
			>{{ name }}</b-button>
		<b-collapse id="menu-item" class="mx-auto">
			<b-list-group>
				<b-list-group-item 
					v-for="item in subItems" 
					:key="item.name" 
					:href="item.url"
					class="border-left text-center"
				>{{ item.name }}</b-list-group-item>
			</b-list-group>
		</b-collapse>

		<b-button 
		v-if="hasSub === false" 
		block 
		class="parent p-3 border-bottom border-left" 
		variant="light"
		:href="url">{{ name }}</b-button>
	</div>
</template>

<script>
const regMap = {
	isUrl: new RegExp('^((http|https)?://)'
            + '(([0-9]{1,3}.){3}[0-9]{1,3}'
            + '|' 
            + '([0-9a-z_!~*()-]+.)*' 
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].'
            + '[a-z]{2,6})'
            + '(:[0-9]{1,4})?'
            + '((/?)|'
						+ '(/[0-9a-z_!~*().;?:@&=+$,%#-]+)+/?)$')};

export default {
	name: 'menu-item',
	props: {
		hasSub: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: '#####'
		},
		url: {
			type: String,
			default: '#'
		},
		subItems: {
			type: Array,
			default: () => []
		}
	}
};
</script>

<style lang="less">
.parent {
	background-color: #f0f0f0
}
</style>

