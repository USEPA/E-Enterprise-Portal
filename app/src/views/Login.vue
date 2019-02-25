<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div class="container">
        <h3>Login</h3>
        <div class="pt-2 caption-wrapper">
            <p class="pt-2 font-weight-bold">Select your preferred login method to access E-Enterprise using one of
                your existing accounts. Choose a
                preferred login type and option to get started.</p>

        </div>
        <div class="pt-3"></div>
        <h6 class="ml-4 font-weight-bold ">Use this account:</h6>
        <b-tabs class="epa-tabs" pills card vertical nav-wrapper-class="w-25">
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
                <h6 class="tabText font-weight-bold">Use your state account to log in...</h6>
                <LoginType index="2"></LoginType>
            </b-tab>
            <b-tab class="tab" title="Tribal">
                <!-- uncomment when a tribal node is added for the content type-->
                <!--<LoginType index="3"></LoginType>-->
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

        ul {
            border-right: 1px solid lightgrey;
            background-color: #FFFFFF;
        }

        li.nav-item a {
            background-color: #F1F1F1;
            color: #094e7a;
            text-decoration: none;

            &:hover{
                 background-color: #094e7a;
                 color: #ffffff;
             }
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

    .caption-wrapper > p{
        max-width: 100%;
    }

</style>
