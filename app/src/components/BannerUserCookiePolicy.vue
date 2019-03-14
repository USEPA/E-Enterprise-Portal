<template>
  <div
    class="fixed-bottom alert alert-info fade show"
    role="alert"
    v-if="showUserCookiePolicy">
    <div class="col-12 text-center p-2">
      While we do not share user credentials, <strong>we can use a cookie to remember your login
      preferences.<br> Would you like us to remember which login option you chose next
      time?</strong>
      <a
        href="https://www.epa.gov/privacy/privacy-and-security-notice#cookies"
        target="_blank"
        class="text-dark text-decoration-underline pl-2">See our cookie policy</a>.
    </div>
    <div class="col-12 text-right p-2 w-75">
      <a
        href="#"
        @click="setUserCookiePolicy"
        data-dismiss="alert"
        class="text-dark text-decoration-underline pr-2"
      >No Thanks</a>
      <button
        class="btn btn-primary"
        data-dismiss="alert"
        @click="setUserCookiePolicy">Yes, Please
      </button>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'BannerUserCookiePolicy',
    props: {},
    computed: {
      ...mapGetters({
        authenticated: 'getIsLoggedIn',
        UserCookiePolicyDismiss: 'getUserCookiePolicyDismiss',
      }),
      showUserCookiePolicy() {
        const vm = this;
        return vm.$route.name.indexOf('workbench') > -1
          && vm.authenticated === false
          && !vm.UserCookiePolicyDismiss;
      },
    },
    methods: {
      ...mapActions([
        'setUserCookiePolicy',
      ]),
    },
  };
</script>
<style
  scoped
  lang="scss">

</style>
