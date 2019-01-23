<!--this view is so that users can find their information and view it and in the future, edit it-->
<template>
<div class="container" >
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
                <div>User Name </div>
                <b-form-input id="first-name-input" v-model="username" type="text" disabled></b-form-input>
            </div>
            <div class="email-container pt-3">
                <div>Email Address</div>
                <b-form-input id="email-input" v-model="mail" type="text" disabled></b-form-input>
             </div>
        </div>

    </div>
            </b-container>
        </b-tab>

                <b-tab title="Interest" active>
                    <b-container class="bv-example-row ml-2">
            <div class="interest-container " >
                <div class="int-container ">
                <div ></div>
                    <h3>Interests</h3>
                    <div class=" pt-3 d-flex">
                    <div><h6>Organization</h6>
                      <b-dropdown id="org_ddown1" text="Business" variant="outline-secondary" class="col-4-md organisation  mr-3" >

                      </b-dropdown>
                    </div>
                    <div text="Role"><h6> Role</h6>
                      <b-dropdown id="role_ddown2" text="Budget and operations"  variant="outline-secondary" class="col-4-md role mr-3">

                      </b-dropdown>
                    </div>
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
                username: 'getUsername',
            }),
        },
        methods: {
            ...mapActions(moduleName, [
                // map actions go here
            ]),
        }
    }
</script>

<style scoped>
</style>