<template>
	<b-card :title="$t('login.title')" class="login text-center">
		<b-form-group
			class="text-left"
			:label="$t('login.username')"
			label-for="username"
		>
			<b-form-input 
				id="username"
				v-model="user.username"
				:placeholder="$t('login.username')"
			></b-form-input>
		</b-form-group>
		<b-form-group
			class="text-left"
			:label="$t('login.password')"
			label-for="password"
		>
			<b-form-input 
				id="password"
				v-model="user.password"
				:placeholder="$t('login.password')"
				type="password"
			></b-form-input>
		</b-form-group>
		<b-row>
			<b-col>
			</b-col>
			<b-col class="ml-auto" cols="auto">
				<b-btn size="sm" variant="link" @click="switchLang">{{$t('login.lang')}}</b-btn>
				<b-btn size="sm" @click="reset">{{$t('login.reset')}}</b-btn>
			</b-col>
		</b-row>
		<b-row class="my-2">
			<b-col>
				<b-btn block variant="success" @click="login">{{$t('login.submit')}}</b-btn>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
export default {
	data() {
		return {
			user: {
				id: null,
				username: '',
				password: ''
			}
		};
	},
	methods: {
		reset() {
			this.user.id = null;
			this.user.username = '';
			this.user.password = '';
		},
		login() {
			this.$store.commit('loginState', {id: 1, username: this.user.username});
			this.$router.push({path: '/'});
		},
		switchLang() {
			this.$i18n.locale = (this.$i18n.locale === 'zh' ? 'en' : 'zh' );
		}
	}
};
</script>

<style lang="less">
.login {
	width: 500px;
	position: absolute;
	top: 50%;   
	left: 50%;
	transform: translate(-50%, -50%);   
}
</style>
