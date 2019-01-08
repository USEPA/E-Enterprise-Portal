<!--this view is so that users can find their information and view it and in the future, edit it-->
<template>
    <div class="user-info-container col-md-12" v-if="isLoggedIn">
        <div class="information-container col-md-6">
            <h3>User Information</h3>
            <div class="first-name-container">
                <div>First Name</div>
                <b-form-input id="first-name-input" v-model="name" type="text" disabled></b-form-input>
            </div>
            <div class="email-container pt-3">
                <div>Email</div>
                <b-form-input id="email-input" v-model="email" type="text" disabled></b-form-input>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    const moduleName = 'User';

    export default {
        name: moduleName,
        components: {
        },
        beforeCreate(){

        },
        created(){
            const store = this.$store;
            if (!(store && store.state && store.state[moduleName])) {
                store.registerModule(moduleName, storeModule);
            }
        },
        data(){
            return{
                name: 'John',
                email: 'john@john.com',

            }
        },

        computed:{
            ...mapGetters({
                // map getters go here
                isLoggedIn: 'getIsLoggedIn',
            }),
        },
        methods: {
            ...mapActions(moduleName, [
                // map actions go here
            ]),
        }
    }
</script>

<style lang="scss" scoped>
</style>