<!--this view is so that users can find their information and view it and in the future, edit it-->
<template>
<div class="container" v-if="isLoggedIn">
        <h3>Profile</h3>
<b-card>
    <b-tabs class="profile-tabs" >
        <b-tab title="Account" active>
            <b-container class="bv-example-row ml-2">
    <div class="user-info-container col-md-12" >
        <div class="information-container col-md-4">
        <div></div>
            <h3>User Information</h3>
            <div class="user-name-container">
                <div>User Name</div>
                <b-form-input id="first-name-input" v-model="name" type="text" disabled>{{username}}</b-form-input>
            </div>
            <div class="email-container pt-3">
                <div>Email</div>
                <b-form-input id="email-input" v-model="email" type="text" disabled></b-form-input>
             </div>
        </div>

    </div>
            </b-container>
        </b-tab>
          <p>All unsaved data will be lost upon navigating away from the Profile page</p>
    </b-tabs>
</b-card>
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