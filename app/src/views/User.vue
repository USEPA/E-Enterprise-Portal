<!--this view is so that users can find their information and view it and in the future, edit it-->
<template>
  <div class="container">
    <h3>Profile</h3>
    <b-card>
      <b-tabs class="profile-tabs">
        <b-tab title="Account" active>
          <b-container class="bv-example-row ml-2">
            <div class="user-info-container col-md-12" >
              <div class="information-container col-md-4 mt-2">
                <div/>
                <h3>User Information</h3>
                <div class="user-name-container">
                  <div>User Name</div>
                  <b-form-input
                    id="first-name-input"
                    v-model="username"
                    type="text"
                    disabled/>
                </div>
                <div class="email-container pt-3">
                  <div>Email Address</div>
                  <b-form-input id="email-input" v-model="mail" type="text" disabled/>
                </div>
              </div>
            </div>
          </b-container>
        </b-tab>

        <b-tab title="Locations">
          <b-container class="bv-example-row ml-2">
            <div class="locations-container">
              <div class="loc-container">
                <h3 class="mt-2">Locations of Interest</h3>
                <div class="pt-3 d-flex">
                  <p>Add your locations of interest to see environmental information relevant to
                  those areas.
                    <span class="font-weight-bold"> Click the </span><i class="far fa-star"/>
                    <span class="font-weight-bold"> icon next to a location to make it your default
                    location.</span>
                  </p>
                </div>
                <div class="pt-3 d-flex">
                  <p>Until a location is specified, the default location is set to
                  Durham, North Carolina.</p>
                </div>
                <div  v-if="user.userlocation.length > 0">
                  <template v-for="(second,index) in user.userlocation">
                    <b-input-group class="pl-2 pb-2 pt-2">
                      <b-form-input ref="selectedLocation" v-model="userlocation[index].second"
                                    type="text"
                                    class="col-4 ml-3"
                                    disabled/>
                      <div class="col-1 cursor-pointer">
                        <template v-if="index == 0">
                          <i :ref="'click-star-' + index" @click="starClick('click-star-' + index)" class="fas fa-star"/>
                        </template>
                        <template v-else>
                          <i :ref="'click-star-' + index" @click="starClick('click-star-' + index)" class="far fa-star"/>
                        </template>
                      </div>
                      <button class="usa-button" value="x" @click="deleteSelectedLocation({
                                typed_in_location: location.typed_in_location,
                                selected_location_from_dropdown: location.selected_location_from_dropdown})">X
                      </button>
                      <span class="col-md-12 pt-1 small"  >{{userlocation[index].first}}</span>
                    </b-input-group>
                  </template>

                </div>

                <!-- format this to output the users inputted locations -->
                  <div id="user-input-locations" v-if="user.userSavedLocations.length > 0">
                      <template v-for="(location, index) in user.userSavedLocations">
                          <b-input-group class="pl-2 pb-2 pt-2">
                              <b-form-input ref="selectedLocation" v-model="location.selected_location_from_dropdown"
                                            type="text"
                                            class="col-4 ml-3"
                                            disabled/>
                              <div class="col-1 cursor-pointer">
                                  <template v-if="index == 0">
                                      <i :ref="'click-star-' + index" @click="starClick('click-star-' + index)" class="fas fa-star"/>
                                  </template>
                                  <template v-else>
                                      <i :ref="'click-star-' + index" @click="starClick('click-star-' + index)" class="far fa-star"/>
                                  </template>
                              </div>
                              <button class="usa-button" value="x" @click="deleteSelectedLocation({
                                typed_in_location: location.typed_in_location,
                                selected_location_from_dropdown: location.selected_location_from_dropdown})">X</button>
                              <span class="col-md-12 pt-1 small">{{location.typed_in_location}}</span>
                          </b-input-group>
                      </template>
                  </div>
                <LocationSelectionOption></LocationSelectionOption>
                <div v-if="user.displayWhenNewLocationIsClicked === ''">
                    <button class="usa-button pt-2" @click="revealLocationInputBox">New Location</button>
                </div>
              </div>
            </div>
          </b-container>
        </b-tab>

        <b-tab title="Interest">
          <b-container class="bv-example-row ml-2">
            <div class="interest-container">
              <div class="int-container">
                <div/>
                <h3>Interests</h3>
                <div class="pt-3 mr-3 d-flex">
                  <div>
                    <h6>Organization</h6>
                    <b-form-select v-model="selected" id="org-selection" class="mr-3" required>
                      <option v-if="organization.length === 0" v-bind:value="null">-None-</option>
                      <option v-else v-bind:value="null">{{organization[0].second}}</option>
                      <option>-None-</option>
                      <option v-for="option in org" v-bind:value="option.name">{{ option.name }}
                      </option>
                    </b-form-select>
                  </div>
                  <div class="mr-3"></div>
                  <div>
                    <h6>Role</h6>
                    <b-form-select v-model="selectedRole" id="role-selection" class="mr-3" required>
                      <option v-if="role.length === 0" v-bind:value="null">-None-</option>
                      <option v-else v-bind:value="null">{{role[0].second}}</option>
                      <option>-None-</option>
                      <option
                        v-for="option in roleList"
                        v-bind:value="option.name">{{ option.name }}
                      </option>
                    </b-form-select>
                  </div>
                </div>
              </div>
            </div>
          </b-container>
        </b-tab>

          <p class="ml-4 mt-4">
              All unsaved data will be lost upon navigating
              away from the Profile page.
          </p>
          <div class="mt-2">
              <b-btn class="usa-button mr-3 ml-2 mt-0" @click="save">Save</b-btn>
              <b-btn v-b-modal.UserDeleteModalInfo class="usa-button">Delete Profile</b-btn>
          </div>
      </b-tabs>
    </b-card>

    <b-modal
      hide-footer
      id="UserDeleteModalInfo"
      ref="UserDeleteModal"
      :title="UserDeleteModalInfo.title">
      <b-row>
        <b-col md="12" class="my-1">
            This will delete your entire profile, including any selected preferences,
          from the E-Enterprise Platform and will log you out from the system. Are you sure that
          you want to do this?
        </b-col>
      </b-row>
        <b-btn class="mt-3 ml-2 float-right" @click="DeleteEEPUserProfile" variant="outline-primary">
            Delete Profile
        </b-btn>
        <b-btn class="mt-3 float-right" @click="hideUserDeleteModal">
            Back
        </b-btn>
    </b-modal>
  </div>
</template>

<script>
  import AppAxios from "axios";
  import { mapActions, mapGetters } from "vuex";
  import LocationSelectionOption from '@/components/LocationSelectionOption.vue';

  const moduleName = 'User';

  export default {
    name: moduleName,
    components: {
        LocationSelectionOption,
    },
    beforeCreate() {},
    data() {
      return {
        locations: [{}],
        UserDeleteModalInfo: { title:'Delete User' },
        selected: null,
        org: [{ first: "" }, { second: "" }],
        selectedRole: null,
        roleList: [],
        selectedLocation:[{first:'', second:''}],
        inputLocation:[]
      };
    },
    computed: {
      ...mapGetters({
        // map getters go here
        user: 'getUser',
      }),
      userInit: {
        get() {
            return this.user.init;
        }
      },
      username: {
        get() {
          return this.user.name;
        }
      },
      mail: {
        get() {
            return this.user.mail;
        }
      },
      organization: {
          get() {
              return this.user.organization;
          }
      },
      role: {
        get() {
            return this.user.role;
        }
      },
      location: {
        get() {
          return this.user.location;
        }
      },
      inputBoxText: {
        get() {
          return this.user.inputBoxText;
        }
      },
      dropDownSelection:{
        get() {
          return this.user.dropDownSelection;
        }
      },
      userSavedLocations: {
        get() {
          return this.user.userSavedLocations;
        }
      },
      userlocation: {
        get() {
          return this.user.userlocation;
        }
      },


    },
    mounted() {
      AppAxios.get("sample_data/organization.json").then(response => {
         this.org = response.data;
      });
      AppAxios.get("sample_data/role.json").then(response => {
         this.roleList = response.data;
      });

      // Set the defaults for the locations
      this.$store.commit('SET_IS_AFTER_INPUT_DROPDOWN_DISPLAYED', '');

      this.$store.dispatch('populateDropdownForUserInput', this.$store.getters.getUser.inputBoxText);
    },
    methods: {
      ...mapActions([
        'apiUserPatch'
      ]),
      hideUserDeleteModal() {
        this.$refs.UserDeleteModal.hide();
      },
      DeleteEEPUserProfile() {
        console.warn('DELETE PROFILE');
      },
      starClick(ref_index){
          // redo logic for star click
          if (this.$refs[ref_index][0].classList.contains('fas')) {
              this.$refs[ref_index][0].classList.remove('fas');
              this.$refs[ref_index][0].classList.add('far');
          } else {
              this.$refs[ref_index][0].classList.remove('far');
              this.$refs[ref_index][0].classList.add('fas');
          }
      },
      save() {
          if (this.selected != '') {
              this.updateOrg();
          }
          if (this.selectedRole != '') {
              this.updateRole();
          }
        this.updateUserLocation();
      },
      updateOrg() {

        this.organization[0].first='org';
        this.organization[0].second=this.selected;;

        let orgParams = {
          field_organization: this.organization
        };
        this.apiUserPatch(orgParams);
        this.organization = [];
      },
      updateRole() {
        this.role[0].first='role';
        this.role[0].second=this.selectedRole;
        const roleparams = {
          field_role: this.role
        };
        this.apiUserPatch(roleparams);
        this.role= [];
      },
      updateUserLocation(){
        let i;
        let userLocationZipcode={};
        for (i = 0; i < this.userSavedLocations.length; i++) {
          let zipcode = this.userSavedLocations[i].selected_location_from_dropdown;
          let typedLocation = this.userSavedLocations[i].typed_in_location;
          this.userlocation.push({first: typedLocation, second: parseInt(zipcode, 10)});
          userLocationZipcode = {
            field_userlocation: this.userlocation,
          };
          this.apiUserPatch(userLocationZipcode);
          this.deleteSelectedLocation({
            typed_in_location: this.userSavedLocations[i].typed_in_location,
            selected_location_from_dropdown: this.userSavedLocations[i].selected_location_from_dropdown
          });
        }
      },
      deleteSelectedLocation(location){
          this.$store.commit('DELETE_USER_SELECTED_LOCATION', location);
      },
      revealLocationInputBox(){
          this.$store.commit('SET_IS_MAIN_INPUT_DISPLAYED', '');
          this.$store.commit('SET_DISPLAY_WHEN_LOCATION_IS_CLICKED', '');
          this.$store.commit('SET_DISPLAY_WHEN_LOCATION_IS_CLICKED', 'none');
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>