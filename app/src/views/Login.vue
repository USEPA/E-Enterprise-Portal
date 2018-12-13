<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div class="container">
      <div>
        <h1><strong>Log In </strong></h1>
        <div class="text-msg"></div>
        <div>
          <h6>Select your preferred login method to access E-Enterprise using one of your existing accounts. Choose a preferred login type and option to get started.</h6>
        </div>

      </div>
      <div class="tab-and-content-wrapper">
            <b-card>
              <span><strong>Use this account:</strong></span>
              <span class="epa-account">
                {{selectedMessage.loginMessage.epaMessage.text}}

              </span>
                <b-tabs pills card vertical>
                    <b-tab  v-on:click="epa()" class="tab" title="EPA" active>

                      <div class="row d-flex justify-content-between">
                        <b-button class="col-lg-3">
                          CDX/Exchange Network
                        </b-button>
                        <b-button class="col-lg-3">
                         EPA LAN/WAM ID
                        </b-button>
                        <b-button class="col-lg-3">
                          PIV Smart Card
                        </b-button>
                      </div>
                    </b-tab>
                    <b-tab class="tab" title="Social Media">
                        Tab Contents 2
                    </b-tab>
                    <b-tab class="tab" title="State">
                        <h6>Use your state account to log in...</h6>
                        <div class="row">
                            {{allLoginAccounts.state.NM.name}}
                        </div>
                    </b-tab>
                    <b-tab class="tab" title="Tribal">
                        Tab Contents 4
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default{

        name: 'Login',
        components: {},
        data() {
            return {
            };
        },
        methods: {
          epa: function(){
            return 'Use your EPA account...';
          }

        },
        computed: {
            ...mapGetters({
                bridgeURL: 'getBridgeURL',
                allLoginAccounts: 'getloginPageAccounts',
                 selectedMessage:'getloginPageMessage',
            }),

        },

    }

</script>

<!-- do not include scope to modify the bootstrap elements -->
<style lang="scss">
  .text-msg{
    height: 30px;
  }
  .epa-account{
    margin-bottom: 1px;
  }
    .card {
        border: none;
    }

    .tabs ul {
        border-right: 1px solid lightgrey;
        li {
            padding: 5px 5px 5px 5px;
            background-color: #E8E8E8;
            margin-bottom: 5px;
            a.active{
                background-color: #0071bc;
                color: white;
            }
            a{

            }
        }
    }

</style>