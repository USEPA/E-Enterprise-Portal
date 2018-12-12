<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div>
        <div>
            <h1><strong>Log In </strong></h1>
            <h6>Select your preferred login method to access E-Enterprise using one of your existing accounts. Choose a preferred login type and option to get started.</h6>
    </div>
    <div class="login-btns pt-4">
        <a class="btn btn-sm btn-outline-secondary" :href="bridgeURL">Exchange Network</a>
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