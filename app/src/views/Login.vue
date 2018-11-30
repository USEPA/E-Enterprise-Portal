<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div>
        <h3>Login</h3>
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