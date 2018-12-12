<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div class="container">
        <h3>Login</h3>
        <div class=" pt-4">
            <p>Select your preferred login method to access E-Enterprise using one of your existing accounts. Chose a
                preferred login type and option to get started.</p>
            <!--<a class="btn btn-sm btn-outline-secondary" :href="bridgeURL">Exchange Network</a>-->
        </div>
        <div class="tabs-wrapper">
            <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#epa">
                        EPA
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#socialmedia">
                        Social Media
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#state">
                        State
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tribal">
                        Tribal
                    </a>
                </li>
            </ul>
        </div>
        <div class="tab-content">
            <div id="epa" class="container tab-pane active">
                <h3>EPA</h3>
                <p>Some content about EPA.</p>
            </div>
            <div id="socialmedia" class="container tab-pane fade">
                <h3>Social Media</h3>
                <p>Some content about social media.</p>
            </div>
            <div id="state" class="container tab-pane fade">
                <h3>State</h3>
                <p>Some content about state.</p>
            </div>
            <div id="tribal" class="container tab-pane fade">
                <h3>Tribal</h3>
                <p>Some content about tribal.</p>
            </div>
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
                bridgeURL: 'getBridgeURL'
            }),
        },
    }
</script>

<style scoped
       lang="scss">
</style>