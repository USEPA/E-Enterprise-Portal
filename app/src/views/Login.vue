<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div class="container">
        <h3>Login</h3>
        <div class="pt-2">
            <p class=" pt-2 font-weight-bold">Select your preferred login method to access E-Enterprise using one of
                your existing accounts. Choose a
                preferred login type and option to get started.</p>

        </div>
        <div class="pt-3"></div>
        <h6 class="ml-4 font-weight-bold ">Use this account:</h6>
        <b-tabs class="epa-tabs" pills card vertical nav-wrapper-class="w-25">
            <b-tab title="EPA" active>
                <h6 class="tabText font-weight-bold">Use your EPA account...</h6>
                <b-container class="bv-example-row ml-2">
                    <div v-for="(account, index) in loginViewAccounts">
                        <!-- v-if -->
                        <div v-if="index % 3 == 0 && account.weight == 0">
                            <b-row class="tabContainer align-h=between">
                                <b-col class="pb-1 col-md-auto">
                                    <div class="link-wrapper pt-2 pb-2 pl-2">
                                        <a class="link" href="javascript:void(0);" @click="navigateToBridge('ENNAAS')">
                                            <img src="../assets/images/exchange-network-x-sm.png" alt="cdx">
                                            <span class="pl-2">{{account[0].data.title[0].value}}</span>
                                        </a>
                                    </div>
                                </b-col>
                                <div class="w-100 d-block d-md-none py-1"></div>
                            </b-row>
                        </div>


                        <!-- v-else -->
                        <!--<b-col class="pb-1 col-md-auto">-->
                        <!--<div class="link-wrapper pt-2 pb-2 pl-2">-->
                        <!--<a class="link" href="javascript:void(0);" @click="navigateToBridge('ENNAAS')">-->
                        <!--<img src="../assets/images/exchange-network-x-sm.png" alt="cdx">-->

                        <!--<span class="pl-2">-->
                        <!--{{allLoginAccounts.EPA.cdx.name}}-->
                        <!--</span>-->
                        <!--</a>-->
                        <!--</div>-->
                        <!--</b-col>-->
                        <!--<div class="w-100 d-block d-md-none py-1"></div>-->
                    </div>
                </b-container>
                <div class="mt-4">
                    You can <a href="https://cdx.epa.gov/">create a free CDX account </a> within the Exchange Network.
                    You only need to provide some basic information.
                </div>
            </b-tab>
            <b-tab class="tab" title="Social Media">
                <h6 class="tabText font-weight-bold">Use your social media account to log in...</h6>
                <b-container class="ml-2 pb-1">
                    <b-row class="tabContainer">
                        <b-col sm class="pb-1">
                            <!--<div class="col-md-12 link-wrapper pt-2 pb-2 pl-2">-->
                                <!--<a class="link" href="javascript:void(0);" @click="navigateToBridge('Facebook')">-->
                                    <!--<img src="../assets/images/facebook-f.png" alt="facebook">-->
                                    <!--<span class="pl-2">{{allLoginAccounts.socialmedia.facebook.name}}</span>-->
                                <!--</a>-->
                            <!--</div>-->
                        </b-col>
                        <b-col sm class="pb-1">
                            <!--<div class="col-md-12 link-wrapper pt-2 pb-2 pl-2">-->
                                <!--<a v-bind:href="allLoginAccounts.socialmedia.twitter.sitePath" class="link"-->
                                   <!--ref="Twitter">-->
                                    <!--<img src="../assets/images/twitter.svg" alt="twitter">-->
                                    <!--<span class="pl-2">{{allLoginAccounts.socialmedia.twitter.name}}</span>-->
                                <!--</a>-->
                            <!--</div>-->
                        </b-col>
                        <b-col></b-col>
                    </b-row>
                </b-container>
            </b-tab>
            <b-tab class="tab" title="State">
                <!-- Once we get more states then it can be optimized with using a v-for to loop through -->
                <!-- and create each <b-row> and each <b-col> -->
                <h6 class="tabText font-weight-bold">Use your state account to log in...</h6>
                <b-container class="ml-2">
                    <b-row class="tabContainer">
                        <b-col sm class="pb-1">
                            <!--<div class="link-wrapper pt-2 pb-2 pl-2">-->
                                <!--<a v-bind:href="allLoginAccounts.state.NM.sitePath" class="link" ref="NMIdP">-->
                                    <!--<img src="../assets/images/nm-logo.png" alt="NM">-->
                                    <!--<span class="pl-2">-->
                                            <!--{{allLoginAccounts.state.NM.name}}-->
                                            <!--</span>-->
                                <!--</a>-->
                            <!--</div>-->
                        </b-col>
                        <b-col sm class="pb-1">
                            <!--<div class="link-wrapper pt-2 pb-2 pl-2">-->
                                <!--Placeholder-->
                            <!--</div>-->
                        </b-col>
                        <b-col sm class="pb-1">
                            <!--<div class="link-wrapper pt-2 pb-2 pl-2">-->
                                <!--Placeholder-->
                            <!--</div>-->
                        </b-col>
                    </b-row>
                </b-container>
            </b-tab>
            <b-tab class="tab" title="Tribal">
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default{
        name: 'Login',
        components: {},
        data() {
            return {};
        },
        methods: {
            ...mapActions([
                'navigateToBridge',
            ]),
        },
        computed: {
            ...mapGetters({
                bridgeURL: 'getBridgeURL',
                loginViewAccounts: 'getLoginViewAccounts'

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

    ul {
        border-right: 1px solid lightgrey;
        background-color: #FFFFFF;

    li.nav-item a {
        background-color: #F1F1F1;
        color: #094e7a;
    }

    li.nav-item a.active {
        background-color: #094e7a;
        color: #ffffff;
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
    .link-wrapper {
        background-color: #888888;

    .link {
        color: #ffffff;
        text-decoration: none;
        padding: 5px;
    }

    img {
        height: 16px;
        width: 16px;
    }

    }
</style>
