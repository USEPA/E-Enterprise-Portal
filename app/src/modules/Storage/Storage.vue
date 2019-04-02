<template>
  <div>
    <!-- Cookie UI if any-->
  </div>
</template>

<script>

    import Vue from 'vue';
    import { mapActions, mapGetters } from 'vuex';
    import storeModule from './store/index';

    const moduleName = 'Storage';

    export default {
        name: moduleName,
        beforeCreate() {
          const vm = this;

          // -- Handling open browser cookies --
          let BrowserSession = sessionStorage.getItem('BrowserSession');
          const routeCurrent = vm.$router.history.current;

          // If there is no browser session and we are not redirecting from a login, delete all
          // related to the users sessions to satisfy CDX policies
          if (!BrowserSession && !routeCurrent.query.token) {
            Vue.cookie.delete('Token');
            Vue.cookie.delete('uid');
            Vue.cookie.delete('userLoggedIn');
            Vue.cookie.delete('userLogInTime');
            sessionStorage.setItem('BrowserSession', 'true');
          }
          // If we redirect from the backend it will now play nice
          else if (!BrowserSession && routeCurrent.query.token) {
            sessionStorage.setItem('BrowserSession', 'true');
          }
          // -- END: Handling open browser cookies --
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
