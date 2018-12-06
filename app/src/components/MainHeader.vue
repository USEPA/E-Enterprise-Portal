<template>
  <header class="py-3 container">
    <div class="d-flex flex-nowrap justify-content-between align-items-center">
      <div class="col-4-md justify-content-start">
        <a
          class="eep_logo"
          href='#/home'
          title="Home - E-Enterprise for the Environment"
          rel="home">
          <img
            src="../assets/images/eenterprise.svg"
            alt="Home - E-Enterprise for the Environment">
        </a>
      </div>
      <div class="w-100 d-block d-md-none "></div>
      <div class="col-4-md d-flex justify-content-end align-self-end align-items-center">
        <div class="col-4-md">
          <template v-if='authenticated'>
            <span>Welcome {{ username }} </span>

            <b-btn
              variant="outline-secondary"
              class="btn btn-md btn-outline-secondary"
              @click="userLogOut">
              Logout
            </b-btn>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="btn btn-md btn-outline-secondary">
              Login
            </router-link>
          </template>
        </div>

      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  // eslint-disable-next-line
  export default {
    name: 'MainHeader',
    props: {},
    computed: {
      ...mapGetters({
        authenticated: 'getUserAuthentication',
        bridgeURL: 'getBridgeURL',
        username: 'getUserFullName',
      }),
    },
    methods: {
      ...mapActions([
        'userLogOut',
      ]),
    },
    data() {
      return {};
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
  lang="scss">
  .eep_logo {

    img {
      max-width: 100%;
    }

  }
</style>
