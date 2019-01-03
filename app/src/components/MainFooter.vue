<template>
  <footer class="footer fixed-bottom">
    <div
      class="alert alert-info"
      role="alert"
      v-if="['workbench'].indexOf($route.name) > -1 &&
      authenticated === false && (tAndCCookieDismiss === false || tAndCCookieDismiss == undefined)">
      <div
        id="terms-conditions"
        class="container w-100 d-flex text-dark">
        <div class="row align-self-center w-100">
          <div class="col-12 text-center">
            <span>By using the E-Enterprise Portal, you agree to the </span>
            <span
              class="text-decoration-underline cursor-pointer"
              @click="setTAndCCookie"
              data-dismiss="alert">
              Terms and Conditions.
            </span>
            &nbsp;&nbsp;
            <span
              class="text-decoration-underline cursor-pointer"
              @click="setTAndCCookie"
              data-dismiss="alert">
              Continue »
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-2">
      <div class="row justify-content-center small">
        <div class="col-auto" v-for="item in info.slice(0,1)" >
          <a
            :href="item.second"
            target="_blank"
            class="">{{item.first}}</a>
        </div>
        <div class="col-auto" v-for="item in info.slice(1,2)" >
          <a
            :href="item.second"
            target="_blank"
            class="">{{item.first}}</a>
        </div>
        <div class="col-auto" v-for="item in info.slice(2,3)" >
          <a
            :href="item.second"
            target="_blank"
            class="">{{item.first}}</a>
        </div>
        <div class="col-auto" v-for="item in info.slice(3,4)" >
          <a
            :href="item.second"
            target="_blank"
            class="">
            {{item.first}}</a>
        </div>
      </div>
      <div class="row">
        <div class="col wd-100"></div>
      </div>
      <div class="row justify-content-center small" >
        <div class="col-auto text-align-center small" > {{this.info1[0].first}} {{this.info1[0].second}}</div>
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
        authenticated: 'getUserAuthentication',
        tAndCCookieDismiss: 'getTAndCCookieDismiss',
        UserPolicyCookieDismiss: 'getUserPolicyCookieDismiss',
      }),
    },
    methods: {
      ...mapActions([
        'setTAndCCookie',
        'setUserPolicyCookie',
      ]),
    },
    data() {
      return {

        info: [
          { first: '', },
          { second: '', },


        ],
        info1: [
          { first: '', },
          { second: '', },


        ]
      }
    },
    mounted() {
      AppAxios
        .get('http://e-enterprise/api/footer')
        .then(response => {
          this.info = response.data[0].field_footer_link_name;
          this.info1 = response.data[0].field_version;
        });

    },
  }

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
