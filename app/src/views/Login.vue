<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
  <div>
    <div>
      <h1><strong>Log In </strong></h1>
      <div class="text-msg"></div>
      <div>
        <h6>Select your preferred login method to access E-Enterprise using one of your existing
        accounts. Choose a preferred login type and option to get started.</h6>
      </div>
    </div>
    <div >
      <a
        class="btn btn-sm btn-outline-secondary"
        :href="bridgeURL">
        Exchange Network
      </a>
    </div>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default{
        name: 'Login',
        components: {},
        data() {
            return {
            };
        },
        methods: {
          ...mapActions([
            'initializeToken',
          ]),
          setDummyToken() {
            if (history.pushState) {
              const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRoIjoic3RhdGUudXNlci5uYW1lIiwidmFsdWUiOnsiZmlyc3QiOiJKb2huIiwibGFzdCI6IkRvZSJ9fQ.DWOsByn_IMbrC2oOjX3Hktr9W-axd0__-JDiud-EcUQ';
              window.history.pushState({ path: newurl }, '', newurl);
            }
            this.initializeToken();
          },
        },
        beforeMount() {
          this.setDummyToken();
        },
        computed: {
            ...mapGetters({
              bridgeURL: 'getBridgeURL',
              authentication: 'getUserAuthentication',
            }),
        },
    };
</script>

<style scoped
       lang="scss">
  .text-msg{
    height: 30px;
  }
</style>
