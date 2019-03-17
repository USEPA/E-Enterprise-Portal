<template>
    <header class="py-3 container">
        <div class="row d-flex justify-content-between align-items-center">
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
            <div class="w-100 d-block d-sm-none "/>

            <div class="col-md-6 col-12 pt-3 d-flex justify-content-center justify-content-lg-end align-self-end-lg">
                <div class="tryit-wrapper pr-2 float-right">
                    <router-link
                            to="/workbench"
                            tag="button"
                            id="try-it-button"
                            ref="try-it-button"
                            class="usa-button pr-3"
                            variant="primary"
                            @mouseover="addTryItArrow"
                            @mouseleave="removeTryItArrow"
                            v-if='!displayLoggedInElements'>
                        <i class="fas fa-arrow-circle-right fa-arrow-alt-from-left pr-1"/>Try It
                    </router-link>
                </div>

                <div class="otherbtns-wrapper float-right">
                    <template v-if='displayLoggedInElements'>
                        <span class="mr-3">Welcome {{ user.name }}</span>
                        <button
                                variant="outline-secondary"
                                class="usa-button"
                                @click="userLogOut">
                            <i class="fas fa-lock pr-1"/>
                            Logout
                        </button>
                        <router-link
                                to="/User"
                                id="my-account"
                                class="usa-button ml-2"
                                variant="primary"
                                tag="button">
                            My account
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link
                                id="log-in-button"
                                ref="log-in-button"
                                to="/login"
                                @mouseover="addLogInArrow"
                                @mouseleave="removeLogInArrow"
                                class="usa-button">
                            <i class="fas fa-lock pr-1"/>Login
                        </router-link>
                    </template>
                </div>

                <b-tooltip
                    v-show="showTryItCaption"
                    id="tryit-arrow"
                    ref="tryit-arrow"
                    target="try-it-button"
                    placement="bottom">
                    Want to just try it? No log in needed.
                </b-tooltip>
                <b-tooltip
                    v-show="showLoginCaption"
                    id="login-arrow"
                    ref="login-arrow"
                    target="log-in-button"
                    placement="bottom">
                        Use an EPA, CDX, or a social media account to login
                </b-tooltip>
            </div>
        </div>
    </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { EventBus } from '../EventBus';

  // eslint-disable-next-line
  export default {
    name: 'MainHeader',
    props: {},
    data() {
      return {
        showTryItCaption: false,
        showLoginCaption: false,
      };
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'getIsLoggedIn',
        bridgeURL: 'getBridgeURL',
        loginBtnHoverMessage: 'getloginBtnHoverMessage',
        displayLoggedInElements: 'getDisplayLoggedInElements',
        user: 'getUser',
      }),
    },
    methods: {
      ...mapActions([
          'navigateToBridge',
          'userLogOut',
      ]),
      removeTryItArrow() {
//          let tryItBtnArrow = this.$refs['tryit-arrow'];
//          tryItBtnArrow.classList.remove('d-block');
//          tryItBtnArrow.classList.add('d-none');
          this.showTryItCaption = false;
      },
      addTryItArrow() {
//          let tryItBtnArrow = this.$refs['tryit-arrow'];
//          tryItBtnArrow.classList.remove('d-none');
//          tryItBtnArrow.classList.add('d-block');
          this.showTryItCaption = true;
      },
      removeLogInArrow() {
//          let loginBtnArrow = this.$refs['login-arrow'];
//          loginBtnArrow.classList.remove('d-block');
//          loginBtnArrow.classList.add('d-none');
            this.showLoginCaption = false;
      },
      addLogInArrow() {
//          let loginBtnArrow = this.$refs['login-arrow'];
//          loginBtnArrow.classList.remove('d-none');
//          loginBtnArrow.classList.add('d-block');
          this.showLoginCaption = true;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
       lang="scss">
    .eep_logo {
        img {
            max-width: 250px;
        }
    }
</style>