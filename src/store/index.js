import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	user: {
		id: null,
		username: '',
	}
};

const mutations = {
	loginState(state, user) {
		state.user = user;
	}
};

export default new Vuex.Store({ state, mutations });