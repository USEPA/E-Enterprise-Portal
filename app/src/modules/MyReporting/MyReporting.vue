<template>
  <div>
    <AppWrapper
      class="pb-5"
      :eep-app="eepApp">
      <div
        v-html="eepApp.field_html_content.mainCard"/>
      <b-col>
        <b-row class="my-reporting-top-line pb-1">
          Report directly to your CDX data flows.
        </b-row>
      </b-col>
      <b-col class="pr-0 pl-0">
        <b-tabs>
          <b-tab
            title="US EPA"
            class="nav-item nav-link active text-decoration-none"
            title-link-class="small text-dark text-bold pb-0"
            title-item-class="w-30 text-center">
            <template>
              <div id="my-reporting-flows-container">
                <ul class="inline-cdx-links pr-3">
                  <li>
                    <a
                      title="My CDX"
                      class="my-cdx-web-handoff-link my-cdx-login cursor-pointer text-primary font-weight-normal"
                      @click="cdxSingleSignOn('direct')">
                      My CDX
                    </a>
                  </li>
                  <li>
                    <a
                      title="Inbox"
                      class="my-cdx-web-handoff-link  my-cdx-inbox cursor-pointer text-primary font-weight-normal"
                      @click="cdxSingleSignOn('Inbox')">
                      Inbox
                    </a>
                  </li>
                  <li>
                    <a
                      title="My Profile"
                      class="my-cdx-web-handoff-link my-cdx-profile cursor-pointer text-primary font-weight-normal"
                      data-handoff-type="profile"
                      @click="cdxSingleSignOn('MyProfile')">
                      My Profile</a>
                  </li>
                  <li>
                    <a
                      title="Submission History"
                      class="my-cdx-web-handoff-link my-cdx-submission cursor-pointer text-primary font-weight-normal"
                      data-handoff-type="submission"
                      @click="cdxSingleSignOn('submission')">
                      Submission History
                    </a>
                  </li>
                </ul>
              </div>
              <b-container fluid>
                <!-- User Interface controls -->
                <b-col>
                  <div class="row">
                    <div class="col-9 mb-1 mr-auto">
                      <b-form-group
                        horizontal
                        label="Filter"
                        label-for="filter-results"
                        class="mb-0">
                        <b-input-group>
                          <b-form-input
                            id="filter-results"
                            aria-controls="my-reporting-table"
                            v-model="filter"
                            placeholder=""/>
                        </b-input-group>
                      </b-form-group>
                    </div>
                    <div class="col-3 mb-1 pl-0">
                      <b-form-group
                        horizontal
                        label="Rows"
                        label-for="row-results"
                        class="mb-0">
                        <b-form-select
                          class="ml-2"
                          aria-controls="my-reporting-table"
                          :options="pageOptions"
                          v-model="perPage"
                          @change="tableToPageOne"/>
                      </b-form-group>
                    </div>
                  </div>
                </b-col>
                <b-table
                  show-empty
                  id="my-reporting-table"
                  class="bootstrap-vue-table-scroll no-top-border no-bottom-border no-sort-images font-weight-normal"
                  stacked="md"
                  :items="items"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  @filtered="onFiltered">
                  <template
                    slot="program_service_name"
                    slot-scope="data">
                    <div>{{ data.item.program_service_name }}</div>
                  </template>
                  <template
                    slot="role"
                    slot-scope="data">
                    <div v-if="data.item.status === 'Active' && data.item.sso_to_app_enabled">
                      <a
                        class="cursor-pointer text-decoration-underline text-primary"
                        @click="onClickGetLinkDetails(data.item.roleId, $event.target)"
                        :data-roleId="data.item.roleId">{{ data.item.role }}
                      </a>
                    </div>
                    <div v-else-if="data.item.status === 'Active'">
                      <a
                        class="cursor-pointer text-decoration-underline text-primary"
                        data-handoff-type="login"
                        @click="cdxSingleSignOn('direct')">
                        {{ data.item.role }}
                      </a>
                    </div>
                    <div v-else>
                      {{ data.item.role }}
                    </div>
                  </template>
                  <template
                    slot="status"
                    slot-scope="data">
                    <div
                      :class="data.item.status"
                      :title="data.item.status"/>
                  </template>
                </b-table>
                <AppModal
                  id="my-reporting-link-details"
                  modal-ref="my-reporting-link-details"
                  busy
                  hide-footer
                  title="Application Profile Settings">
                  <div class="my-cdx-modal">
                    <template v-if="!selectRequired">
                      <div class="w-100 text-center">
                        <b-spinner large/>
                      </div>
                    </template>
                    <template v-else>
                      <div class="my-cdx-detail-group">Organization Name</div>
                      <div class="organization-name"/>
                      <template v-if="linkDetails.organizations">
                        <b-form-select
                          v-model="organization"
                          class="mb-3"
                          @change="prepareProgramSelectionsFromOrganization($event)">
                          <template slot="first">
                            <option
                              disabled
                              :value="null">Choose Organization...</option>
                            <option
                              v-for="(item, index) in linkDetails.organizations"
                              :value="linkDetails.organizations[index]"
                              :key="index">
                              {{ item.orgName }}
                            </option>
                          </template>
                        </b-form-select>
                      </template>
                      <template v-else>
                        No Organizations...
                      </template>
                      <div class="my-cdx-detail-group">Program Client ID</div>
                      <div class="program-client-name"/>
                      <b-form-select
                        :disabled="!organization"
                        v-model="userRoleId"
                        class="mb-3"
                        @change="prepareHandoffWithUserRoleId($event)">
                        <template
                          slot="first"
                          v-if="!!organization">
                          <option
                            disabled
                            :value="null">Choose Program Client...</option>
                          <option
                            v-for="(item, index) in organization.programClients"
                            :value="item.userRoleId"
                            :key="index">
                            {{ item.roleName }} - {{ item.clientName }}
                          </option>
                        </template>
                      </b-form-select>
                      <div class="my-cdx-detail-group">
                        <b-btn
                          variant="primary"
                          :disabled="!handoff"
                          @click="openPopupPage()">
                          <b-spinner
                            small
                            v-if="!handoff"/>
                          Proceed
                        </b-btn>
                      </div>
                    </template>
                  </div>
                </AppModal>
                <b-row
                  class="text-center"
                  v-if="totalRows > perPage"
                >
                  <b-col
                    md="12"
                    class="my-1">
                    <b-pagination
                      align="center"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="my-0 font-weight-normal">
                      <div
                        class="wapp-arrows"
                        slot="first-text"><img
                          src="/images/pager-first.png"
                          alt="Go to first page"></div>
                      <div
                        class="wapp-arrows"
                        slot="next-text"><img
                          src="/images/pager-next.png"
                          alt="Go to next page"></div>
                      <div
                        class="wapp-arrows"
                        slot="prev-text"><img
                          src="/images/pager-previous.png"
                          alt="Go to previous page"></div>
                      <div
                        class="wapp-arrows"
                        slot="last-text"><img
                          src="/images/pager-last.png"
                          alt="Go to last page"></div>
                    </b-pagination>
                  </b-col>
                </b-row>
              </b-container>
            </template>
          </b-tab>
        </b-tabs>
      </b-col>
    </AppWrapper>
  </div>
</template>

<script>
  import AppAxios from 'axios';
  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal, PaginationArrows } from '../wadk/WADK';
  import storeModule from './store/index';

  const moduleName = 'MyReporting';
  const items = [];

  export default {
    name: moduleName,
    components: {
      AppWrapper,
      AppModal,
      PaginationArrows,
    },
    data() {
      return {
        items,
        fields: [
          {
            key: 'program_service_name',
            label: 'Program service name',
            thStyle: { width: '58%' },
          },
          {
            key: 'role',
            label: 'Role',
            thStyle: { width: '33%' },
          },
          {
            key: 'status',
            label: 'Status',
            thStyle: { width: '9%' },
          },
        ],
        currentPage: 1,
        perPage: 5,
        pageOptions: [
          { value: 5, text: '5' },
          { value: 10, text: '10' },
          { value: 25, text: '25' },
          { value: 50, text: '50' },
          { value: 100000, text: 'All' },
        ],
        filter: null,
        modalInfo: { title: '', content: '' },
        linkDetails: {},
        organization: null,
        userRoleId: null,
        roleId: '',
        handoff: null,
        cdx_configs: {},
        selectRequired: true,
      };
    },
    beforeCreate() {

    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    },
    mounted() {
      const vm = this;
      const cookie = vm.$cookie.get('Token');
      if (vm.isUserLoggedIn) {
        AppAxios.get(
          `${vm.apiURL}/api/cdx/dataflows`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
              crossDomain: true,
              'cache-control': 'no-cache',
              'Content-Type': 'application/json',
            },
          },
        ).then((response) => {
          vm.items = response.data;
        });

        AppAxios.get(
          `${vm.apiURL}/api/cdx/configs`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
              crossDomain: true,
              'cache-control': 'no-cache',
              'Content-Type': 'application/json',
            },
          },
        ).then((response) => {
          vm.cdx_configs = response.data;
        });
      }
    },
    computed: {
      ...mapGetters({
        apiURL: 'getEnvironmentApiURL',
        isUserLoggedIn: 'getIsLoggedIn',
      }),
      token() {
        return this.$cookie.get('Token');
      },
      totalRows: {
        get() {
          return this.items.length;
        },
      },
    },
    methods: {
      ...mapActions(moduleName, [
        // map actions go here
      ]),
      closeAddModal() {
        this.$root.$emit('bv::hide::modal', 'my-reporting-link-details');
      },
      getCdxParams() {
        return {
          ssoToken: this.cdx_configs.ssoToken,
        };
      },
      getReturnURLWithCdxParams(urlPathEnd) {
        let returnUrl = '';
        const cdxParams = this.getCdxParams();
        if (urlPathEnd === 'submission') {
          returnUrl = this.cdx_configs.cdx_submission_history_url;
        } else {
          returnUrl = `${this.cdx_configs.cdx_base_url}/${urlPathEnd}`;
        }
        returnUrl = `?URL=${encodeURIComponent(returnUrl)}`;
        cdxParams.returnUrl = returnUrl;
        return cdxParams;
      },
      info(item, index, button) {
        this.modalInfo.title = `Row index: ${index}`;
        this.modalInfo.content = JSON.stringify(item, null, 2);
        this.$root.$emit('bv::show::modal', 'modalInfo', button);
      },
      resetModal() {
        this.modalInfo.title = '';
        this.modalInfo.content = '';
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      openPopupPage() {
        const vm = this;
        const url = vm.handoff.destination_url;
        const params = vm.handoff.post_params;
        if (url && params) {
            vm.openWindowWithPost(url, '', 'sso-handoff', params);
            vm.$ga.event('eportal', 'click', 'My Reporting SSO Handoff', 1);
        }
        vm.closeAddModal();
      },
      cdxSingleSignOn(signOnType) {
        const vm = this;
        let params;
        if (signOnType === 'direct') {
          params = vm.getCdxParams();
        } else {
          params = vm.getReturnURLWithCdxParams(signOnType);
        }
        vm.openWindowWithPost(vm.cdx_configs.cdx_silent_handoff_url, '', 'sso-handoff', params);
        vm.$ga.event('eportal', 'click', `My Reporting Direct SSO- ${signOnType}`, 1);
      },
      openWindowWithPost(url, windowoption, name, params) {
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        form.setAttribute('target', '_blank');
        const keys = Object.keys(params);

        // eslint-disable-next-line array-callback-return
        keys.map((key) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = params[key];
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      },
      onClickGetLinkDetails(roleIds, button) {
        const vm = this;

        if (roleIds) {
          this.$Progress.start();
          AppAxios.get(
            `${vm.apiURL}/api/cdx/link-details-json/${roleIds}`,
            {
              headers: {
                Authorization: `Bearer ${vm.token}`,
                crossDomain: true,
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
              },
            },
          )
            .then((response) => {
              vm.organization = null;
              vm.selectRequired = true;
              vm.$root.$emit('bv::show::modal', 'my-reporting-link-details', button);
              vm.linkDetails = response.data;
              if (vm.linkDetails.organizations.length === 1) {
                vm.organization = vm.linkDetails.organizations[0];
                if (vm.organization.programClients.length === 1) {
                    vm.selectRequired = false;
                }
                vm.prepareProgramSelectionsFromOrganization(vm.organization);
              }
              this.$Progress.finish();
              this.$ga.event('eportal', 'click', 'My Reporting Link Details', 1);
            });
        }
      },
      prepareHandoffWithUserRoleId(userRoleID) {
        const vm = this;
        vm.handoff = null;
        if (userRoleID) {
          AppAxios.get(
            `${vm.apiURL}/api/cdx/link-json-handoff/${userRoleID}`,
            {
              headers: {
                Authorization: `Bearer ${vm.token}`,
                crossDomain: true,
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
              },
            },
          )
            .then((response) => {
              vm.handoff = response.data;
              if (!vm.selectRequired) {
                vm.openPopupPage();
              }
            });
        }
      },
      tableToPageOne() {
        this.currentPage = 1;
      },
      prepareProgramSelectionsFromOrganization(organization) {
        const vm = this;
        if (organization.programClients.length === 1) {
          vm.userRoleId = organization.programClients[0].userRoleId;
          vm.prepareHandoffWithUserRoleId(vm.userRoleId);
        }
      },
    },
    props: {
      eepApp: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped
  lang="scss">
  #app {
    margin-bottom: 7rem;
  }
  #my-reporting-flows-container .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #000;
    font-weight: bold;
    text-decoration: none;
  }
  #my-reporting-flows-container .nav-item {
    color: #000;
  }
  .col-form-label {
    font-size: 0.875rem; // 14px - Use smaller size in tab content
  }
  .my-reporting-top-line {
    font-size: 0.875rem;    // 14px
  }
  .form-group {
    border: 0rem;
  }
  .tab-pane, .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }
  .inline-cdx-links {
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding-left: 0px;
  }
  .inline-cdx-links a::before {
    display: inline-flex;
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    background-size: 1rem;
    background-color: #0071c2;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    margin-right: 2px;
    vertical-align: middle;
  }
  .inline-cdx-links a.my-cdx-login::before {
    background-image: url('/images/mr-my-cdx.png');
    background-color: #fff;
    border: 1px solid #6c757d;
  }
  .inline-cdx-links a.my-cdx-inbox::before {
    background-image: url('/images/mr-inbox.svg');
  }
  .inline-cdx-links a.my-cdx-profile::before {
    background-image: url('/images/mr-profile.svg');
  }
  .inline-cdx-links a.my-cdx-alerts::before {
    background-image: url('/images/mr-alerts.svg');
  }
  .inline-cdx-links a.my-cdx-submission::before {
    background-image: url('/images/mr-history.svg');
  }
  .my-cdx-web-handoff-link {
    font-size: .875rem; // 14px
  }
  .Active {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #fff;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: none;
    background-size: 1.3rem 1.325rem;
    background-image: url('../../assets/images/check-circle-solid.svg');
  }
  .AwaitingSponsorship {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #fff;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: none;
    background-size: 1.3rem 1.325rem;
    background-image: url('/images/my_cdx_images_awaiting-sponsor.svg')
  }
  .AwaitingElectronicSignatureAgreement {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #fff;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: none;
    background-size: 1.3rem 1.325rem;
    background-image: url('/images/my_cdx_images_awaiting-esa.svg')
  }
  .AwaitingApproval {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #fff;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: none;
    background-size: 1.3rem 1.325rem;
    background-image: url('/images/my_cdx_images_awaiting-approval.svg')
  }
  .Inactive {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #fff;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: none;
    background-size: 1.3rem 1.325rem;
    background-image: url('/images/minus-circle-solid.svg')
  }
  .OfflineTemporary {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #fff;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: none;
    background-size: 1.3rem 1.325rem;
    background-image: url('/images/minus-circle-solid.svg')
  }
</style>
