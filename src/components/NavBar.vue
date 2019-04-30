<template>
	<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">{{ $t('navigation.title') }}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="$t('navigation.lang')" right>
          <b-dropdown-item v-for="(lang, i) of langs" :key="`langs[${i}]`" :value="lang" @click="$i18n.locale = lang">{{lang}}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content">{{ $t('navigation.user.name')}}</template>
          <b-dropdown-item href="#">{{ $t('navigation.user.help')}}</b-dropdown-item>
          <b-dropdown-item href="#">{{ $t('navigation.user.exit')}}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
	name: 'nav-bar',
	data() {
		return {
			langs: ['en', 'zh']
		};
	},
};
</script>


