<template>
	<div class="utils-sidebar">
		<b-card
			v-for="(item, index) in items" 
			:key="index"
			class="border-0"
			no-body
		>
			<b-button
				v-if="item.children"
				block 
				v-b-toggle.accordion
				variant="white"
				class="rounded-0 text-left py-3"
			><i :class="`${item.icon} mr-2`"></i>{{ item.name }}</b-button>
			<b-collapse 
				v-if="item.children"
				id="accordion"
			>
				<b-button
					v-for="(child, index) in item.children"
					:key="`items[${index}]`"
					:href="child.url"
					:class="{
						'rounded-0': true,
						'active': child.tab === activeBtn
						}"
					variant="white"
					block
					@click.passive="changeActiveBtn(child.tab)"
				>{{ child.name }}</b-button>
			</b-collapse>

			<b-button
				v-if="!item.children"
				block
				variant="white"
				:href="item.url"
				:class="{
					'rounded-0': true, 
					'text-left': true, 
					'py-3': true,
					'active': index === activeBtn
				}"
				@click.passive="changeActiveBtn(index)"
			><i :class="`${item.icon} mr-2`"></i>{{ item.name }}</b-button>
		</b-card>
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
	},
	data() {
		return {
			activeBtn: -1
		}
	},
	methods: {
		changeActiveBtn(index) {
			this.activeBtn = index;
		}
	}
};
</script>

<style lang="less">
.utils-sidebar {
	.btn {
		color: #959595;
		&:hover {
			background-color: #007BFF;
			color: #fff;
			.fas {
				color: #fff;
			}
		}
		&.active {
			background-color: #007BFF;
			color: #fff;
			.fas {
				color: #fff;
			}
		}
		.fas {
			color: #000;
			width: 25px;
			font-size: 18px;
		}
	}
}
</style>

