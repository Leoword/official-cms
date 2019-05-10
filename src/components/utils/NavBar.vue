<template>
	<b-navbar 
		toggleable="lg"
		type="dark"
		variant="dark"
	>
		<b-navbar-brand href="/#/">{{ $t('navigation.title') }}</b-navbar-brand>
		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown :text="$t('navigation.lang.title')" right>
					<b-dropdown-item 
						v-for="(lang, idx) in langs" 
						:key="`langs[${idx}]`"
						:value="lang"
						@click="$i18n.locale=lang"
					>{{ $t(`navigation.lang.${lang}`) }}</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-nav-item-dropdown :text="$t('navigation.user.name')" right>
					<b-dropdown-item @click="logout">{{ $t('navigation.user.exit') }}</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: 'nav-bar',
	data() {
		return {
			langs: ['zh', 'en']
		};
	},
	methods: {
		logout() {
			this.$api.user.logout().then(() => {
				this.$store.commit('loginState', {id: null, username: ''});
				this.$router.push({path: '/login'});
			});
		}
	}
};
</script>
