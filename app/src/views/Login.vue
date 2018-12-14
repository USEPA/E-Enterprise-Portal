<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div class="container">
        <h3>Login</h3>
        <div class="pt-2">
            <p class=" pt-2 font-weight-bold">Select your preferred login method to access E-Enterprise using one of your existing accounts. Choose a
                preferred login type and option to get started.</p>
            <a class="btn btn-sm btn-outline-secondary" :href="bridgeURL">Exchange Network</a>
        </div>
        <div id="tabs-wrapper">
            <b-card>
                <h6 class="tabs-heading">Use this account:</h6>
                <b-tabs pills card vertical>
                    <b-tab class="tab" title="EPA" active>

                    </b-tab>
                    <b-tab class="tab" title="Social Media">

                    </b-tab>
                    <b-tab class="tab" title="State">
                        <!-- Once we get more states then it can be optimized with using a v-for to loop through -->
                        <!-- and create each <b-row> and each <b-col> -->
                        <h6>Use your state account to log in...</h6>
                        <b-container fluid class="bv-state-container">
                            <b-row>
                                <b-col>
                                    <div class="link-wrapper">
                                        <a v-bind:href="allLoginAccounts.state.NM.sitePath" class="col-md-12">
                                            <img src="../assets/images/nm-logo.png" alt="NM">
                                            <span class="anchor-label">
                                            {{allLoginAccounts.state.NM.name}}
                                            </span>
                                        </a>
                                    </div>
                                </b-col>
                                <b-col>
                                    Place holder for other state
                                </b-col>
                                <b-col>
                                    Place holder for another state
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-tab>
                    <b-tab class="tab" title="Tribal">

                    </b-tab>
                </b-tabs>
            </b-card>
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
              allLoginAccounts: 'getloginPageAccounts'
            }),
        },
    };
</script>

<!-- do not include scope to modify the bootstrap elements -->
<style lang="scss">
    .card {
        border: none;
    }

    .tabs {
        ul{
            border-right: 1px solid lightgrey;
            background-color: #FFFFFF;
            li.nav-item a{
                background-color: #F1F1F1;
                color: #094e7a;
            }
            li.nav-item a.active {
                background-color: #094e7a;
                color: #ffffff;
            }

            li.nav-item a.active, li.nav-item a{
                margin-bottom: 10px;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;
                padding: 20px 100px 20px 10px;
            }
            .tab{
                margin-top: -5%;
            }
        }
        .col-auto{
            position: relative;
        }
    }

    #tabs-wrapper {
        border-right: 1px solid lightgrey;
    }

    .bv-state-container {
        .row{
            margin-top: 20px;
        }
        .link-wrapper {
            background-color: #888888;
            padding: 5px 5px 5px 5px;
            a {
                color: #ffffff;
                text-decoration: none;
                padding-right: 5px;
            }
        }
    }

    .anchor-label{
        padding-left: 10px;
    }

    .tabs-heading{
        margin-left: 20px;
    }
</style>
