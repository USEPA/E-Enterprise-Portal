<template>
  <footer class="footer fixed-bottom">
    <div
      class="alert alert-footerLinks"
      role="alert"
      v-if="['workbench'].indexOf($route.name) > -1 &&
      authenticated === false && (termsAndConditionsCookie === false || termsAndConditionsCookie == undefined)">
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
    <div
      v-if="footerLinks.length > 0"
      class="container py-2">
      <div class="row justify-content-center small">
        <div
          class="col-auto"
          v-for="item in footerLinks" >
          <a
            :href="item.second"
            target="_blank"
            class="">{{ item.first }}</a>
        </div>
      </div>
      <div class="row justify-content-center small">
        <div class="col-auto text-align-center small">
          {{ this.footerVersion[0].first }} {{ this.footerVersion[0].second }}
        </div>
      </div>
    </div>
    <div
      v-else-if="footerLinks.length === 0"
      class="container py-2">
      <div class="row justify-content-center small">
        <div
          class="col-auto">
          Loading Footer...
        </div>
      </div>
      <div class="row justify-content-center small">
        <div class="col-auto text-align-center small">
          Loading Footer...
        </div>
      </div>
    </div>
    <div
      class="alert alert-success px-3"
      role="alert"
      v-if="['workbench'].indexOf($route.name) > -1 && authenticated === true && (UserPolicyCookieDismiss === false || UserPolicyCookieDismiss == undefined)">
      <div class="col-12 text-center p-2">While we do not share user credentials, <strong>we can use a cookie to remember your login preferences.<br > Would you like us to remember which login option you chose next time?</strong>  <a
        href="https://www.epa.gov/privacy/privacy-and-security-notice#cookies"
        target="_blank"
        class="text-dark text-decoration-underline pl-2">See our cookie policy</a>.</div>
      <div class="col-12 text-right p-2 w-75"><a
        href="#"
        @click="setUserPolicyCookie"
        data-dismiss="alert"
        class="text-dark text-decoration-underline pr-2"
      >No Thanks</a><button
        class="btn btn-primary"
        data-dismiss="alert"
        @click="setUserPolicyCookie">Yes, Please</button></div>
    </div>
  </footer>
</template>
<script>
  import AppAxios from 'axios';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'MainFooter',
    computed: {
      ...mapGetters({
        authenticated: 'getIsLoggedIn',
        termsAndConditionsCookie: 'getTermsAndConditionsCookie',
        UserPolicyCookieDismiss: 'getUserPolicyCookieDismiss',
        apiUrl: 'getEnvironmentApiURL',
      }),
    },
    methods: {
      ...mapActions([
        'onTermsAndConditions',
        'setUserPolicyCookie',
      ]),
    },
    data() {
      return {

        footerLinks: [],
        footerVersion: [],
      };
    },
    mounted() {
      AppAxios
        .get(`${this.apiUrl}/api/footer`)
        .then((response) => {
          this.footerLinks = response.data[0].field_footer_link_name;
          this.footerVersion = response.data[0].field_version;
        });
    },
  };

</script>

<style scoped
  lang="scss">
  @import '../styles/bootstrap-mixins-cheatsheet.scss';
  footer {
    color: #fefefe;
    background-color: #323a45;

    a {
      color: #fefefe;

      &:hover, &:active {
        text-decoration: underline;
      }

    }

  }
    @include media-breakpoint-down(xs) {
      footer.fixed-bottom {
        position: relative;
        right: auto;
        bottom: auto;
        left: auto;
        z-index: auto;
      }
    }

  #terms-conditions {
    min-height: 5em;
    max-width: none;
    z-index: 1200;
  }
</style>
