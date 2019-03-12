<!--this view is so that users can find their information and view it and in the future, edit it-->
<template>
  <div class="container">
    <h3>Profile</h3>
    <b-card>
      <b-tabs class="profile-tabs">
        <b-tab
          title="Account"
          active>
          <b-container class="bv-example-row ml-2">
            <div class="user-info-container col-md-12">
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
                  <!-- try to incorporate the users selections here -->
                <template v-for="(location, index) in user.userLocationsFromLoad">
                  <template v-if=" user.userFavoriteLocation.length > 0 &&
                        (location.first === user.userFavoriteLocation[0].first &&
                            location.second === user.userFavoriteLocation[0].second)">
                    <b-input-group :ref="user.userFavoriteLocation[0].first + user.userFavoriteLocation[0].second" class="pl-2 pb-2 pt-2">
                      <b-form-input ref="selectedLocation" v-model="user.userFavoriteLocation[0].second" class="col-4 ml-3" disabled/>
                      <div class="col-1 cursor-pointer">
                        <template>
                          <i ref="favoriteStars" @click="starClick(user.userFavoriteLocation[0].first,
                              user.userFavoriteLocation[0].second)" class="fas fa-star"/>
                        </template>
                      </div>
                      <button class="usa-button" value="x" @click="deleteSelectedLocation({
                          first: user.userFavoriteLocation[0].first,
                          second: user.userFavoriteLocation[0].second
                      })">X</button>
                      <span class="col-md-12 pt-1 small">{{user.userFavoriteLocation[0].first}}</span>
                    </b-input-group>
                  </template>
                  <template v-else>
                    <b-input-group :ref="location.first + location.second" class="pl-2 pb-2 pt-2">
                      <b-form-input ref="selectedLocation" v-model="location.second" class="col-4 ml-3" disabled/>
                      <div class="col-1 cursor-pointer">
                        <template>
                          <i ref="favoriteStars" @click="starClick(location.first, location.second)" class="far fa-star"/>
                        </template>
                      </div>
                      <button class="usa-button" value="x" @click="deleteSelectedLocation({first: location.first,second: location.second})">
                      X
                      </button>
                      <span class="col-md-12 pt-1 small">{{ location.first }}</span>
                   </b-input-group>
                  </template>
                </template>

                <LocationSelectionOption/>
                <div v-show="user.displayNewLocation">
                  <button
                    class="usa-button pt-2"
                    @click="revealLocationInputBox">New Location
                  </button>
                </div>
              </div>
            </div>
          </b-container>
        </b-tab>
        <div class="d-none">
          <b-tab title="Interest">
            <b-container class="bv-example-row ml-2">
              <div class="interest-container">
                <div class="int-container">
                  <div/>
                  <h3>Interests</h3>
                  <div class="pt-3 mr-3 d-flex">
                    <div>
                      <h6>Organization</h6>
                      <b-form-select
                        v-model="selected"
                        id="org-selection"
                        class="mr-3"
                        required>
                        <option
                          v-if="organizations.length === 0"
                          :value="null">-None-
                        </option>
                        <option
                          v-else
                          :value="null">{{ organizations[0].second }}
                        </option>
                        <option>-None-</option>
                        <option
                          v-for="option in org"
                          :value="option.name">{{ option.name }}
                        </option>
                      </b-form-select>
                    </div>
                    <div class="mr-3"/>
                    <div>
                      <h6>Role</h6>
                      <b-form-select
                        v-model="selectedRole"
                        id="role-selection"
                        class="mr-3"
                        required>
                        <option
                          v-if="roles.length === 0"
                          :value="null">-None-
                        </option>
                        <option
                          v-else
                          :value="null">{{ roles[0].second }}
                        </option>
                        <option>-None-</option>
                        <option
                          v-for="option in roleList"
                          :value="option.name">{{ option.name }}
                        </option>
                      </b-form-select>
                    </div>
                  </div>
                </div>
              </div>
            </b-container>
          </b-tab>
        </div>
        <p class="ml-4 mt-4">
          All unsaved data will be lost upon navigating
          away from the Profile page.
        </p>
        <div class="mt-2">
          <b-btn
            class="usa-button mr-3 ml-2 mt-0"
            @click="save">Save
          </b-btn>
          <b-btn
            v-b-modal.UserDeleteModalInfo
            class="usa-button">Delete Profile
          </b-btn>
        </div>
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
          class="my-1">
          This will delete your entire profile, including any selected preferences,
          from the E-Enterprise Platform and will log you out from the system. Are you sure that
          you want to do this?
        </b-col>
      </b-row>
      <b-btn
        class="mt-3 ml-2 float-right"
        @click="DeleteEEPUserProfile"
        variant="outline-primary">
        Delete Profile
      </b-btn>
      <b-btn
        class="mt-3 float-right"
        @click="hideUserDeleteModal">
        Back
      </b-btn>
    </b-modal>
  </div>
</template>

<script>
  import AppAxios from 'axios';
  import { mapActions, mapGetters } from 'vuex';
  import LocationSelectionOption from '@/components/LocationSelectionOption.vue';

  const moduleName = 'User';

  export default {
    name: moduleName,
    components: {
      LocationSelectionOption,
    },
    beforeCreate() {
    },
    data() {
      return {
        locations: [{}],
        UserDeleteModalInfo: { title: 'Delete User' },
        selected: null,
        org: [{ first: '' }, { second: '' }],
        selectedRole: null,
        roleList: [],
        selectedLocation: [{ first: '', second: '' }],
        inputLocation: [],
        indexValue: '',
        locationInfo: [{ first: '', second: null }],
        userFavLocation: { first: '', second: '' },
      };
    },
    computed: {
      ...mapGetters({
        user: 'getUser',
      }),
      userInit: {
        get() {
          return this.user.init;
        },
      },
      username: {
        get() {
          return this.user.name;
        },
      },
      mail: {
        get() {
          return this.user.mail;
        },
      },
      organizations: {
        get() {
          return this.user.organizations;
        },
      },
      roles: {
        get() {
          return this.user.roles;
        },
      },
      location: {
        get() {
          return this.user.location;
        },
      },
      inputBoxText: {
        get() {
          return this.user.inputBoxText;
        },
      },
      dropDownSelection: {
        get() {
          return this.user.dropDownSelection;
        },
      },
      userSavedLocations: {
        get() {
          return this.user.userSavedLocations;
        },
      },
      userLocationsFromLoad: {
        get() {
          return this.user.userLocationsFromLoad;
        },
      },
      userLocationsFromLoadCopy: {
        get() {
          return this.user.userLocationsFromLoadCopy;
        },
      },
      userfavoritelocations: {
        get() {
          return this.user.userfavoritelocations;
        },
      },
    },
    mounted() {
      AppAxios.get('sample_data/organization.json').then((response) => {
        this.org = response.data;
      });
      AppAxios.get('sample_data/role.json').then((response) => {
        this.roleList = response.data;
      });

      // Set the defaults for the locations
      this.$store.commit('SET_IS_AFTER_INPUT_DROPDOWN_DISPLAYED', 'none');
    },
    methods: {
      ...mapActions([
        'apiUserPatch',
      ]),
      hideUserDeleteModal() {
        this.$refs.UserDeleteModal.hide();
      },
      DeleteEEPUserProfile() {
        console.warn('DELETE PROFILE');
      },
      starClick(typedInLocation, zipcode) {
        const stars = this.$refs.favoriteStars;

        const selectedStarParent = this.$refs[typedInLocation + zipcode];

        if (stars.length === 1) {
          if (selectedStarParent[0].children[1].children[0].classList.contains('fas')) {
            selectedStarParent[0].children[1].children[0].classList.remove('fas');
            selectedStarParent[0].children[1].children[0].classList.add('far');
          } else {
            selectedStarParent[0].children[1].children[0].classList.remove('far');
            selectedStarParent[0].children[1].children[0].classList.add('fas');
          }
        } else {
          // Loop through all of the stars and see if it is seletced as a favorite and if so, clear it
          stars.forEach((star) => {
            if (star.classList.contains('fas')) {
              star.classList.remove('fas');
              star.classList.add('far');
            }
          });
          selectedStarParent[0].children[1].children[0].classList.remove('far');
          selectedStarParent[0].children[1].children[0].classList.add('fas');
        }
        this.$store.commit('SET_USER_FAV_LOCATION', [{
            first: typedInLocation,
            second: zipcode
        }]);
      },
      save() {
        this.updateUserLocation();
        this.updateFavoriteLocation();

        // these if statements will not work as the interest tab is hidden
        if (this.selected) {
          this.updateOrg();
        }
        if (this.selectedRole) {
          this.updateRole();
        }
      },
      updateUserLocation() {
        const userLocations = [];
        let userLocationZipcode = {};

        this.userLocationsFromLoad.forEach((item) => {
          userLocations.push({ first: item.first, second: parseInt(item.second, 10) });
          userLocationZipcode = {
            field_userlocation: this.userLocationsFromLoad,
          };
          this.apiUserPatch(userLocationZipcode);
        });
      },
      updateOrg() {
        this.organizations[0].first = 'org';
        this.organizations[0].second = this.selected;
        const orgParams = {
          field_organization: this.organizations,
        };
        this.apiUserPatch(orgParams);
        this.organizations = [];
      },
      updateRole() {
        this.roles[0].first = 'role';
        this.roles[0].second = this.selectedRole;
        const roleparams = {
          field_role: this.roles,
        };
        this.apiUserPatch(roleparams);
        this.roles = [];
      },
      updateFavoriteLocation() {
        let {userFavoriteLocation} = this.$store.getters.getUser;
        let newLocationToSave = [];

        if(userFavoriteLocation.length === 0){
            newLocationToSave.push({
                first: '',
                second: ''
            });
        }else{
            newLocationToSave.push({
                first: this.$store.getters.getUser.userFavoriteLocation[0].first,
                second: this.$store.getters.getUser.userFavoriteLocation[0].second
            });
        }

        this.apiUserPatch({
          field_userfavoritelocations: newLocationToSave,
        });
      },
      deleteSelectedLocation(location) {
        if (location.second === this.userLocationsFromLoad[0].second) {
          // Clear all the stars
          this.$refs.favoriteStars.forEach((star) => {
            star.classList.remove('fas');
            star.classList.add('far');
          });
          this.$store.commit('SET_DOES_USER_HAVE_FAVORITE_LOCATION', false);
          this.apiUserPatch({
            field_userfavoritelocations: [],
          });
        }
        this.$store.commit('DELETE_USER_SELECTED_LOCATION', location);
        this.apiUserPatch({
          field_userlocation: this.$store.getters.getUser.userLocationsFromLoad,
        });
      },
      revealLocationInputBox() {
        // Reset the display none for the populated dropdown
        this.$store.commit('SET_IS_AFTER_INPUT_DROPDOWN_DISPLAYED', true);
        this.$store.commit('SET_IS_MAIN_INPUT_DISPLAYED', true);
        this.$store.commit('SET_DISPLAY_NEW_LOCATION', false);
      },
    },
  };
</script>

<style lang="scss"
  scoped>
</style>
