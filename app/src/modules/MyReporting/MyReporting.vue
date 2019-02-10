<template>
  <div id="reportingrow">
    <AppWrapper
      class="pb-5"
      :eep-app="eepApp">
      <div
        v-html="eepApp.field_html_content.mainCard"
        class="pb-2"/>
      <nav>
        <div
          class="nav nav-tabs nav-fill"
          id="nav-tab"
          role="tablist">
          <a
            class="nav-item nav-link active"
            data-toggle="tab"
            href="#nav-epa"
            role="tab"
            aria-controls="nav-epa"
            aria-selected="true">US EPA</a>
          <a
            class="nav-item nav-link"
            data-toggle="tab"
            href="#nav-state"
            role="tab"
            aria-controls="nav-state"
            aria-selected="false">State</a>
          <a
            class="nav-item nav-link"
            data-toggle="tab"
            href="#nav-tribal"
            role="tab"
            aria-controls="nav-tribal"
            aria-selected="false">Tribal</a>
          <a
            class="nav-item nav-link"
            data-toggle="tab"
            href="#nav-local"
            role="tab"
            aria-controls="nav-local"
            aria-selected="false">Local</a>
        </div>
      </nav>
      <div id="my-reporting">
        <ul class="inline-cdx-links">
          <li class="my-cdx-login"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="login"
            href="javascript:void(0)">My CDX</a></li>
          <li class="my-cdx-inbox"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="inbox"
            href="javascript:void(0)">Inbox</a></li>
          <li class="my-cdx-alerts"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="alerts"
            href="javascript:void(0)">News and Alerts</a>
          </li>
          <li class="my-cdx-profile"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="profile"
            href="javascript:void(0)">My Profile</a>
          </li>
          <li class="my-cdx-submission"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="submission"
            href="javascript:void(0)">Submission
            History</a></li>
        </ul>
      </div>
      <div
        class="tab-content"
        id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-epa"
          role="tabpanel"
          aria-labelledby="nav-epa-tab">
          <template>
            <b-container fluid>
              <!-- User Interface controls -->
              <b-row>
                <b-col
                  md="6"
                  class="my-1">
                  <b-form-group
                    horizontal
                    label="Filter"
                    class="mb-0">
                    <b-input-group>
                      <b-form-input
                        v-model="filter"
                        placeholder=""/>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col
                  md="6"
                  class="my-1">
                  <b-form-group
                    horizontal
                    label="Rows"
                    class="mb-0">
                    <b-form-select
                      :options="pageOptions"
                      v-model="perPage"/>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-table
                show-empty
                stacked="md"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                @filtered="onFiltered"
              >
                <template
                  slot="program_service_name"
                  slot-scope="data">
                  <div>{{ data.item.program_service_name }}</div>
                </template>
                <template
                  slot="role"
                  slot-scope="data">
                  <div>
                    <b-btn
                      @click="onClickGetLinkDetails(data.item.roleId, $event.target)"
                      :data-roleId="data.item.roleId">{{ data.item.role }}</b-btn>
                  </div>
                </template>
                <template
                  slot="status"
                  slot-scope="data">
                  <div :class="data.item.status"/>
                </template>
              </b-table>
              <AppModal
                id="my-reporting-link-details"
                modal-ref="my-reporting-link-details"
                busy
                hide-footer
                title="Application Profile Settings">
                <div class="my-cdx-modal">
                  <div class="my-cdx-detail-group">Organization Name</div>
                  <div class="organization-name"/>

                  <b-form-select
                    v-model="organization"
                    class="mb-3">

                    <template slot="first">
                      <option :value="null">Choose Organization...</option>
                      <option
                        v-for="(item, index) in linkDetails.organizations"
                        :value="linkDetails.organizations[index]"
                        :key="index"
                      >{{ item.orgName }}
                      </option>
                    </template>

                  </b-form-select>

                  <div class="my-cdx-detail-group">Program Client ID</div>
                  <div class="program-client-name"/>
                  <b-form-select
                    v-model="programClientId"
                    class="mb-3"
                    @change="onProgramClientChange(value)">
                    <template slot="first">
                      <option :value="null">Choose Program Client...</option>
                      <option
                        v-for="(item, index) in organization.programClients"
                        :value="item.userRoleId"
                        :key="index">
                        {{ item.roleName }} - {{ item.clientName }}
                      </option>
                    </template>

                  </b-form-select>

                  <div class="my-cdx-detail-group">Program</div>
                  <div class="program-acronym"/>
                  <div class="my-cdx-detail-group">
                    <b-btn @click="openPopupPage()">Proceed</b-btn>
                  </div>
                </div>
              </AppModal>
              <b-row class="text-center">
                <b-col
                  md="12"
                  class="my-1">
                  <b-pagination
                    align="center"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    v-model="currentPage"
                    class="my-0"/>
                </b-col>
              </b-row>
            </b-container>
          </template>
        </div>
        <div
          class="tab-pane fade"
          id="nav-state"
          role="tabpanel"
          aria-labelledby="nav-state-tab"/>
        <div
          class="tab-pane fade"
          id="nav-local"
          role="tabpanel"
          aria-labelledby="nav-local-tab"/>
        <div
          class="tab-pane fade"
          id="nav-tribal"
          role="tabpanel"
          aria-labelledby="nav-tribal-tab"/>
      </div>
    </AppWrapper>
  </div>
</template>

<script>
  import AppAxios from 'axios';
  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
  import storeModule from './store/index';
  import { EventBus } from '../../EventBus';

  const moduleName = 'MyReporting';
  const items = [];

  export default {
    name: moduleName,
    components: {
      AppWrapper,
      AppModal,
    },
    data() {
      return {
        items,
        fields: [
          {
            key: 'program_service_name',
            label: 'Program service name',
          },
          {
            key: 'role',
            label: 'Role',
          },
          {
            key: 'status',
            label: 'Status',
          },
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: items.length,
        pageOptions: [
          { value: 5, text: '5' },
          { value: 10, text: '10' },
          { value: 25, text: '25' },
          { value: 50, text: '50' },
          { value: -1, text: 'All' },
        ],
        filter: null,
        modalInfo: { title: '', content: '' },
        linkDetails: {},
        organization: {},
        programClientId: null,
        roleId: '',
        userRoleId: '',
        handoff: {},
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
        )
          .then((response) => {
            vm.items = response.data;
          });
      }
    },
    computed: {
      ...mapGetters({
        apiURL: 'getEnvironmentApiURL',
        isUserLoggedIn: 'getIsLoggedIn',
        // map getters go here
      }),
      token() {
        return this.$cookie.get('Token');
      },
    },
    methods: {
      ...mapActions(moduleName, [
        // map actions go here
      ]),
      closeAddModal(item, index, button) {
        this.$root.$emit('bv::hide::modal', 'modalInfo', button);
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
        this.openWindowWithPost(this.handoff.destination_url, '', 'sso-handoff', this.handoff.post_params);
      },
      openWindowWithPost(url, windowoption, name, params) {
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        form.setAttribute('target', name);
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
        window.open('sso-handoff.htm', name, windowoption);
        form.submit();
        document.body.removeChild(form);
      },
      onClickGetLinkDetails(roleIds, button) {
        const vm = this;

        if(roleIds){
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
              vm.$root.$emit('bv::show::modal', 'my-reporting-link-details', button);
              vm.linkDetails = response.data;
            });
        }

      },
      onProgramClientChange() {
        const vm = this;

        if (vm.programClientId) {
          AppAxios.get(
            `${vm.apiURL}/api/cdx/link-json-handoff/${vm.programClientId}`,
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
            });
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

  #reportingrow {
    overflow-y: scroll;
    max-height: 100%;
  }

  #my-reporting .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #000;
    font-weight: bold;
  }

  #my-reporting .nav-item {
    color: #000;
  }

  .form-group {
    border: 0rem;
  }

  h2::before {
    height: 50px;
    width: 50px;
    content: url('/images/state-government.svg');
  }

  .inline-cdx-links {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin-top: 1rem;
    padding-left: 0px;
  }

  .inline-cdx-links li::before {
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

  .inline-cdx-links li.my-cdx-login::before {
    background-image: url('/images/mr-my-cdx.png');
    background-color: #fff;
    border: 1px solid #6c757d;
  }

  .inline-cdx-links li.my-cdx-inbox::before {
    background-image: url('/images/mr-inbox.svg');
  }

  .inline-cdx-links li.my-cdx-profile::before {
    background-image: url('/images/mr-profile.svg');
  }

  .inline-cdx-links li.my-cdx-alerts::before {
    background-image: url('/images/mr-alerts.svg');
  }

  .inline-cdx-links li.my-cdx-submission::before {
    background-image: url('/images/mr-history.svg');
  }

  .my-cdx-web-handoff-link {
    font-size: .8rem;
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

</style>
