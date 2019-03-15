<template>
    <div>
        <b-container class="ml-2">
            <b-row class="tabContainer">
                <div v-for="account in loginViewAccounts">
                    <!-- v-if -->
                    <template v-if="account.weight == index">
                        <b-col class="pb-1 col-md-auto">
                            <div class="link-wrapper">
                                <a class="link" href="javascript:void(0);"
                                   @click="navigateToBridge(account.data.field_urn[0].value)">
                                    <img :src="account.data.field_option_image[0].url" alt="not found">
                                    <span class="pl-2">{{account.data.title[0].value}}</span>
                                </a>
                            </div>
                        </b-col>
                        <div class="w-100 d-block d-md-none py-1" v-if="index % 3 == 0"></div>
                    </template>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';
    import { AppWrapper, AppModal, AppPlaceholderContent } from '../modules/wadk/WADK';
    import { EventBus } from '../EventBus';

    export default {
        name: 'LoginType',
        props: ['index'],
        components: {
            AppWrapper,
        },
        beforeCreate() {},
        created() {},
        data() {
            return {};
        },
        mounted() {},
        computed: {
            ...mapGetters({
                loginViewAccounts: 'getLoginViewAccounts',
            }),
        },
        methods: {
            ...mapActions([
                'navigateToBridge',
            ]),
        },
    }

</script>

<style scoped lang="scss">

    .link-wrapper {
        background-color: #AEB0B6;
        cursor: pointer;
        width: 232px;
        padding: 15px;

        &:hover{
             background-color: #094E7A;
         }

        .link {
            color: #ffffff;
            text-decoration: none;
        }

        img {
            height: 24px;
            width: 24px;
        }
    }

</style>