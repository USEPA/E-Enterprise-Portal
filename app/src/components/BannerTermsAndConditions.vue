<template>
  <div
    class="fixed-bottom alert alert-info fade show"
    role="alert"
    v-if="showTermsAndConditions">
    <div
      id="terms-conditions"
      class="container w-100 d-flex text-dark">
      <div class="row align-self-center w-100">
        <div class="col-12 text-center">
          <span>By using the E-Enterprise Portal, you agree to the </span>
          <a
            href="https://cdx.epa.gov/Terms"
            target="_blank"
            class="text-dark font-weight-bold">
            Terms and Conditions</a>
          <span
            class="text-decoration-underline cursor-pointer font-weight-bold"
            @click="onTermsAndConditions"
            data-dismiss="alert">Continue »</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'BannerTermsAndConditions',
    props: {},
    computed: {
      ...mapGetters({
        authenticated: 'getIsLoggedIn',
        termsAndConditionsCookie: 'getTermsAndConditionsCookie',
        UserCookiePolicyDismiss: 'getUserCookiePolicyDismiss',
      }),
      showTermsAndConditions() {
        const vm = this;
        return vm.$route.name.indexOf('workbench') > -1
          && vm.authenticated === true
          && !vm.termsAndConditionsCookie;
      },
    },
    methods: {
      ...mapActions([
        'onTermsAndConditions',
      ]),
    },
  };
</script>
<style
  scoped
  lang="scss">

  #terms-conditions {
    min-height: 5em;
    max-width: none;
    z-index: 1200;
  }
</style>
