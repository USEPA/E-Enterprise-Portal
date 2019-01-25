<!--this view is so that users can find their information and view it and in the future, edit it-->
<template>
  <div class="container" >
    <h3>Profile</h3>
    <b-card>
      <b-tabs class="profile-tabs" >

        <b-tab
          title="Account"
          active>
          <b-container class="bv-example-row ml-2">
            <div class="user-info-container col-md-12" >
              <div class="information-container col-md-4">
                <div/>
                <h3>User Information</h3>
                <div class="user-name-container">
                  <div>User Name </div>
                  <b-form-input
                    id="first-name-input"
                    v-model="username"
                    type="text"
                    disabled/>
                </div>
                <div class="email-container pt-3">
                  <div>Email Address</div>
                  <b-form-input
                    id="email-input"
                    v-model="mail"
                    type="text"
                    disabled/>
                </div>
              </div>
            </div>
          </b-container>
        </b-tab>

        <b-tab
          title="Locations">
          <b-container class="bv-example-row ml-2">
            <div class="locations-container " >
              <div class="loc-container ">
                <h3 class="mt-2">Locations of Interest</h3>
                <div class=" pt-3 d-flex">
                  <p>Add your locations of interest to see environmental information relevant to
                  those areas.
                    <span class="font-weight-bold"> Click the </span><i class="far fa-star"/>
                    <span class="font-weight-bold"> icon next to a location to make it your default
                    location.</span>
                  </p>
                </div>
                <div class=" pt-3 d-flex">
                  <p>Until a location is specified, the default location is set to
                  Durham, North Carolina.</p>
                </div>
                <div class="pt-3 d-flex">
                  <b-input-group>
                    <label
                      class="col-12 font-weight-bold"
                    >
                      Enter city, state; tribe; or ZIP code
                    </label>
                    <b-form-input
                      class="col-6 ml-3"
                      value="Durham, North Carolina"/>
                    <div class="col-6 cursor-pointer">
                      <i
                        ref="click-star"
                        @click="starClick"
                        class="fas fa-star"/>
                    </div>
                  </b-input-group>
                </div>
              </div>
            </div>
          </b-container>
        </b-tab>

        <b-tab
          title="Interest">
          <b-container class="bv-example-row ml-2">
            <div class="interest-container " >
              <div class="int-container ">
                <div />
                <h3>Interests</h3>
                <div class=" pt-3 d-flex">
                  <div><h6>Organization</h6>
                    <b-dropdown
                      id="org_ddown1"
                      text="Business"
                      variant="outline-secondary"
                      class="col-4-md organisation  mr-3" />
                  </div>
                  <div text="Role"><h6> Role</h6>
                    <b-dropdown
                      id="role_ddown2"
                      text="Budget and operations"
                      variant="outline-secondary"
                      class="col-4-md role mr-3"/>
                  </div>
                </div>
              </div>
            </div>
          </b-container>
        </b-tab>

        <p class="ml-4 mt-4">All unsaved data will be lost upon navigating
        away from the Profile page.</p>
        <b-btn
          v-b-modal.UserDeleteModalInfo
          variant="outline-primary">Delete Profile</b-btn>
      </b-tabs>
    </b-card>

    <b-modal
      hide-footer
      id="UserDeleteModalInfo"
      ref="UserDeleteModal"
      :title="UserDeleteModalInfo.title">
      <b-row>
        <b-col
          md="12"
          class="my-1">This will delete your entire profile, including any selected preferences,
          from the E-Enterprise Platform and will log you out from the system. Are you sure that
          you want to do this?
        </b-col>
      </b-row>
      <b-btn
        class="mt-3 ml-2 float-right"
        @click="DeleteEEPUserProfile"
        variant="outline-primary">Delete Profile
      </b-btn>
      <b-btn
        class="mt-3 float-right"
        @click="hideUserDeleteModal">Back
      </b-btn>

    </b-modal>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  const moduleName = 'User';

  export default {
    name: moduleName,
    components: {
    },
    beforeCreate() {

    },
    data() {
      return {
        mail: 'bob@example.com',
        locations: [{ }],
        UserDeleteModalInfo: { title: 'Delete User' },
      };
    },

    computed: {
      ...mapGetters({
        // map getters go here
        isLoggedIn: 'getIsLoggedIn',
        username: 'getUsername',
        mail: 'getUserEmail',
      }),
    },
    methods: {
      ...mapActions(moduleName, [
        // map actions go here
      ]),
      hideUserDeleteModal() {
        this.$refs.UserDeleteModal.hide();
      },
      starClick() {
        if (this.$refs['click-star'].classList.contains('fas')) {
          this.$refs['click-star'].classList.remove('fas');
          this.$refs['click-star'].classList.add('far');
        } else {
          this.$refs['click-star'].classList.remove('far');
          this.$refs['click-star'].classList.add('fas');
        }
      },
      DeleteEEPUserProfile() {
        console.log('DELETE PROFILE');
      },
    },
  };
</script>

<style scoped>
</style>
