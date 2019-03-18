<template>
  <div class="container">
    <h3>Login</h3>
    <div class="pt-2 caption-wrapper">
        <p class="pt-2 font-weight-bold">Select your preferred login method to access E-Enterprise
        using one of
        your existing accounts. Choose a
        preferred login type and option to get started.</p>
        </div>
        <div class="pt-3"></div>
        <h6 class="ml-4 font-weight-bold ">Use this account:</h6>
        <b-tabs class="epa-tabs" pills card vertical>
            <b-tab title="EPA" active>
                <h6 class="tabText font-weight-bold">Use your EPA account...</h6>
                <LoginType index="0"></LoginType>
                <div class="mt-4">
                    You can <a href="https://cdx.epa.gov/">create a free CDX account </a> within the Exchange Network.
                    You only need to provide some basic information.
                </div>
            </b-tab>
            <b-tab class="tab" title="Social Media">
                <h6 class="tabText font-weight-bold">Use your social media account to log in...</h6>
                <LoginType index="1"></LoginType>
            </b-tab>
            <b-tab class="tab" title="State">
                <!-- Once we get more states then it can be optimized with using a v-for to loop through -->
                <!-- and create each <b-row> and each <b-col> -->
                <!-- uncomment when a tribal node is added for the content type-->
                <!--<h6 class="tabText font-weight-bold">Use your state account to log in...</h6>-->
                <!--<LoginType index="2"></LoginType>-->
                <p>
                    We're working with select state agencies so you can log in with your state account credentials. In the
                    meantime, please use your EPA or social media accounts or the Try It option.
                </p>
                <h6 class="font-weight-bold">
                    Interested in becoming a state partner?
                </h6>

                <router-link to="/for-partners">
                    Learn more about how to partner.
                </router-link>
            </b-tab>
            <b-tab class="tab" title="Tribal">

                <!-- uncomment when a tribal node is added for the content type-->
                <!--<h6 class="tabText font-weight-bold">Use your tribal account to log in...</h6>-->
                <!--<LoginType index="3"></LoginType>-->
                <p>
                    We would like to work with tribal nations so you can log in using your tribal nation account credentials.
                    In the meantime, please use your EPA or social media accounts or the Try It option.
                </p>
                <h6 class="font-weight-bold">
                    Interested in becoming a tribal partner?
                </h6>
                <router-link to="/for-partners">
                    Learn more about how to partner.
                </router-link>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import LoginType from '@/components/LoginType.vue';

    export default{
        name: 'Login',
        components: {
            LoginType,
        },
        data() {
            return {};
        },
        methods: {
            ...mapActions([
                'navigateToBridge',
            ]),
        },
        beforeCreate(){
            this.$store.dispatch('handleLogin');
        },
        computed: {
            ...mapGetters({
                bridgeURL: 'getBridgeURL',
            }),
        },
    };
</script>

<!-- do not include scope to modify the bootstrap elements -->
<style lang="scss">

  @media only screen and (min-width: 500px) {
    .tabText {
      position: relative;
      top: -2.9rem;
    }
  }

  .epa-tabs {
      .col-auto{
          width: 25%;
      }
      ul {
          border-right: 1px solid lightgrey;
          background-color: #fff;

          li.nav-item a {
              background-color: #f1f1f1;
              color: #094e7a;
              text-decoration: none;

              &:hover {
                  background-color: #094e7a;
                  color: #fff;
              }
          }

          li.nav-item a.active {
              background-color: #094e7a;
              color: #fff;
          }

          li.nav-item a.active, li.nav-item a {
              margin-bottom: 10px;
              -webkit-border-radius: 0;
              -moz-border-radius: 0;
              border-radius: 0;
              height: 4rem;
              padding-top: 20px;

          }

      }
  }

  .caption-wrapper > p{
      max-width: 100%;
  }

  @media only screen and (max-width: 444px) {
    .epa-tabs {
      .col-auto{
        width: 100%;
      }
      ul{
        border: none;
      }
    }
  }

</style>
