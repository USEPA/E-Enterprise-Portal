<template>
  <div>
    <!-- Cookie UI if any-->
  </div>
</template>

<script>

    import Vue from 'vue';
    import { mapActions, mapGetters } from 'vuex';
    import storeModule from './store/index';

    const moduleName = 'Cookies';

    export default {
        name: moduleName,
        beforeCreate() {
          const vm = this;
          // Handles open browser cookies
          const session = Vue.cookie.get('BrowserSession');
          const routeCurrent = vm.$router.history.current;
          // If there is no browser session and we are not redirecting from a login, delete all
          // related to the users sessions
          if (!session && !routeCurrent.query.token) {
            // remove cookies to satisfy CDX policies
            Vue.cookie.delete('Token');
            Vue.cookie.delete('uid');
            Vue.cookie.delete('userLoggedIn');
            Vue.cookie.delete('userLogInTime');
            Vue.cookie.set('BrowserSession', true);
          }
        },
        created() {
            const store = this.$store;
            if (!(store && store.state && store.state[moduleName])) {
                store.registerModule(moduleName, storeModule);
            }
        },
    };
</script>

<style scoped
       lang="scss">
</style>
