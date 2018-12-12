<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div class="container">
        <h3>Login</h3>
        <div class="pt-2">
            <p>Select your preferred login method to access E-Enterprise using one of your existing accounts. Chose a
                preferred login type and option to get started.</p>
            <!--<a class="btn btn-sm btn-outline-secondary" :href="bridgeURL">Exchange Network</a>-->
        </div>
        <div class="tab-and-content-wrapper">
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