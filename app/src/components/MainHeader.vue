<template>
    <header class="py-3 container">
        <div class="d-flex flex-nowrap justify-content-between align-items-center">
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
            <div class="w-100 d-block d-md-none "></div>
            <div class="col-4-md d-flex justify-content-end align-self-end align-items-center">
                <div class="col-4-md">
                    <router-link to="/login" class="btn btn-md btn-outline-secondary">
                        Login
                    </router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapGetters } from 'vuex';

    // eslint-disable-next-line
    export default {
        name: 'MainHeader',
        props: {},
        methods: {},
        computed: {
            ...mapGetters({
                bridgeURL: 'getBridgeURL'
            }),
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
       lang="scss">
    .eep_logo {

    img {
        max-width: 100%;
    }

    }
</style>
