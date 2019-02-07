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
            href="https://dev.epacdx.net">My CDX</a></li>
          <li class="my-cdx-inbox"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="inbox"
            href="https://dev.epacdx.net">Inbox</a></li>
          <li class="my-cdx-alerts"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="alerts"
            href="https://dev.epacdx.net">News and Alerts</a>
          </li>
          <li class="my-cdx-profile"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="profile"
            href="https://dev.epacdx.net">My Profile</a>
          </li>
          <li class="my-cdx-submission"><a
            class="my-cdx-web-handoff-link"
            data-handoff-type="submission"
            href="https://dev.epacdx.net">Submission
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
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                @filtered="onFiltered"
              />
              <b-modal>
                <div class="my-cdx-modal">
                  <div class="my-cdx-detail-group">Organization Name</div>
                  <div class="organization-name"/>
                  <select class="organization-select"/>
                  <div class="my-cdx-detail-group">Program Client ID</div>
                  <div class="program-client-name"/>
                  <select class="program-client-select"/>
                  <div class="my-cdx-detail-group">Program</div>
                  <div class="program-acronym"/>
                  <div class="my-cdx-detail-group">
                    <button class="proceed">Proceed</button>
                    <button class="cancel">Cancel</button>
                  </div>
                </div>
              </b-modal>
              <b-row>
                <b-col
                  md="6"
                  class="my-1">
                  <b-pagination
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
    },
    data() {
      return {
        items,
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
      const cookie = this.$cookie.get('Token');
      const isUserLoggedIn = vm.$store.getIsLoggedIn;
      if (isUserLoggedIn) {
        AppAxios.get(
          `${this.apiURL}/api/cdxdataflows`,
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
          this.items = response.data;
        });
      }
    },
    computed: {
      ...mapGetters({
        apiURL: 'getEnvironmentApiURL',
        // map getters go here
      }),
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }));
    },
    methods: {
      ...mapActions(moduleName, [
        // map actions go here
      ]),
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

  h2::before {
    height: 50px;
    width: 50px;
    content: url('../../assets/images/state-government.svg');
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

  .status-icon {
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
</style>
