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
                <div class="pt-3 d-flex">
                  <b-input-group>
                    <label class="col-12 font-weight-bold">
                      Enter city, state; tribe; or ZIP code
                    </label>
                    <b-form-input id="locationInput" v-model="inputBoxText" @keydown.native="submitInput" class="col-4 ml-3"/>
                    <div class="col-6 cursor-pointer">
                      <i ref="click-star" @click="starClick" class="fas fa-star"/>
                    </div>
                  </b-input-group>
                </div>
                <div id="input-box-results-drop-down" class="pt-3 d-flex">
                    <b-input-group :style="{display: isDisplayed}">
                        <label class="col-12 font-weight-bold">Select a zipcode for {{inputBoxTextAfterSubmit}}</label>
                        <b-form-select class="col-4 ml-3">
                            <template v-for="afterInputOption in afterInputOptions">
                                <template v-if="/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(afterInputOption)">
                                    <option>
                                        {{afterInputOption}}
                                    </option>
                                </template>
                                <template v-else>
                                    <option disabled>
                                        {{afterInputOption}}
                                    </option>
                                </template>
                            </template>
                        </b-form-select>
                    </b-input-group>
                </div>
                  <div class="locations-btn-wrapper pt-2 ml-3" :style="{display: isDisplayed}">
                      <button class="usa-button">Select</button>
                      <button class="usa-button">Back</button>
                  </div>
              </div>
            </div>
          </b-container>
        </b-tab>

        <b-tab
          title="Interest">
          <b-container class="bv-example-row ml-2">
            <div class="interest-container">
              <div class="int-container">
                <div />
                <h3>Interests</h3>
                <div class="pt-3 mr-3 d-flex">
                  <div>
                    <h6>Organization</h6>
                      <b-form-select v-model="selected" id="org-selection" class="mr-3" required>
                          <option v-if="organisation.length === 0" v-bind:value="null">-None-</option>
                          <option v-else v-bind:value="null">{{organisation[0].second}}</option>
                          <option v-else v-bind:value="null">{{organisation[0].second}}</option>
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

  const moduleName = 'User';

  export default {
    name: moduleName,
    components: {},
    beforeCreate() {},
    data() {
      return {
        inputBoxText: '',
        locations: [{}],
        UserDeleteModalInfo: { title:'Delete User' },
        selected: null,
        org: [{ first: "" }, { second: "" }],
        selectedRole: null,
        roleList: [],
        organisations: [],
        roles: [],
      };
    },
    computed: {
      ...mapGetters({
        // map getters go here
        user: 'getUser',
        afterInputOptions: 'getOptionsAfterInput',
        isDisplayed: 'getIsAfterInputDropdownDisplayed',
        inputBoxTextAfterSubmit: 'getInputBoxSelectionAfterSubmit',
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
      organisation: {
          get() {
              return this.user.organisation;
          }
      },
      role: {
          get() {
              return this.user.role;
          }
      },
    },
    mounted() {
      AppAxios.get("sample_data/organisation.json").then(response => {
         this.org = response.data;
      });
      AppAxios.get("sample_data/role.json").then(response => {
         this.roleList = response.data;
      });
    },
    methods: {
        ...mapActions(['apiUserPatch']),
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
          console.warn('DELETE PROFILE');
        },
        save() {
            if (this.selected != '') {
                this.updateOrg();
            }
            if (this.selectedRole != '') {
                this.updateRole();
            }
        },
        updateOrg() {
            const firstField = 'org';
            const secondField = this.selected;
            this.organisations = this.organisations.concat({
                first: firstField,
                second: secondField
            });
            const orgParams = {
                field_organisation: this.organisations
            };
            this.apiUserPatch(orgParams);
        },
        updateRole() {
            const firstField = 'role';
            const secondField = this.selectedRole;
            this.roles = this.roles.concat({
                first: firstField,
                second: secondField
            });
            const params = {
                field_role: this.roles
            };
            this.apiUserPatch(params);
        },
        submitInput(event){
            if(event.which === 13){
                this.$store.dispatch('populateDropdownForUserInput', this.inputBoxText);
            }
        }
    },
  };
</script>

<style lang="scss" scoped>
</style>