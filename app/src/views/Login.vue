<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div class="container">
        <h3>Login</h3>
        <div class="pt-2">
            <p>Select your preferred login method to access E-Enterprise using one of your existing accounts. Chose a
                preferred login type and option to get started.</p>
            <!--<a class="btn btn-sm btn-outline-secondary" :href="bridgeURL">Exchange Network</a>-->
        </div>
        <div id="tabs-wrapper">
            <b-card>
                <span>Use this account:</span>
                <b-tabs pills card vertical>
                    <b-tab class="tab" title="EPA" active>
                        Tab Contents 1
                    </b-tab>
                    <b-tab class="tab" title="Social Media">
                        Tab Contents 2
                    </b-tab>
                    <b-tab class="tab" title="State">
                        <h6>Use your state account to log in...</h6>
                        <div class="row">
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

        },
        computed: {
            ...mapGetters({
                bridgeURL: 'getBridgeURL',
                allLoginAccounts: 'getloginPageAccounts'
            }),
        },
    }
</script>

<!-- do not include scope to modify the bootstrap elements -->
<style lang="scss">
    .card {
        border: none;
    }

    .tabs ul {
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
    }

    #tabs-wrapper {
        border-right: 1px solid lightgrey;
    }


</style>