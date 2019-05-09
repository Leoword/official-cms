<template>
	<div>
			<div v-for="(item, index) in items" :key="index">
				<b-btn
					v-if="item.children"
					block
					class="parent p-3 border-left border-bottom"
					variant="light"
				>{{item.name}}</b-btn>
				<b-list-group>
					<b-list-group-item
						v-for="(child, index) in item.children"
						:key="`items[${index}]`"
						class="text-center"
						:href="child.url"
					>{{child.name}}</b-list-group-item>
				</b-list-group>
				<b-button
					v-if="!item.children"
					class="parent p-3 border-left border-bottom"
					block
					variant="light"
					:href="item.url"
				>{{ item.name }}</b-button>
			</div>
	</div>
</template>

<script>
export default {
	name: 'side-bar',
	props: {
		items: {
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

