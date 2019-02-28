<template ref="myCertifications">
  <AppWrapper
    :eep-app="eepApp">
    <div v-html="eepApp.field_html_content.mainCard"/>
    <b-row class="datatable-controls">
      <b-col
        md="6"
        class="my-1 my-certifications-filter">
        <b-form-group
          horizontal
          label="Filter"
          label-for="filter-results"
          class="mb-2">
          <b-input-group>
            <b-form-input
              id="filter-results"
              aria-controls="my-certifications-table"
              v-model="datatableSettings.filter"/>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col
        md="6"
        class="my-1 my-certifications-rows-column">
        <b-form-group
          horizontal
          label="Rows"
          label-for="row-results"
          class="mb-2">
          <b-form-select
            aria-controls="my-certifications-table"
            id="row-results"
            :options="datatableSettings.pageOptions"
            v-model="datatableSettings.perPage"
            class="float-right ml-3"/>
        </b-form-group>
      </b-col>
    </b-row>

    <!--datatable-->
    <b-table
      v-if="certificationsLoaded"
      hover
      id="my-certifications-table"
      class="bootstrap-vue-mycerts-table-scroll"
      :items="certifications"
      :fields="datatableSettings.fields"
      :current-page="datatableSettings.currentPage"
      :per-page="datatableSettings.perPage"
      :filter="datatableSettings.filter"
      :sort-by.sync="datatableSettings.sortBy"
      :sort-desc.sync="datatableSettings.sortDesc"
      :sort-direction="datatableSettings.sortDirection"
      @filtered="onFiltered">

      <template
        slot="status"
        slot-scope="row">
        <div
          v-if="row.value === 'Needs Attention'"
          class="cert-needs-attn text-decoration-underline text-bold cursor-pointer"
          @click="openCertsDecriptionModal(row.item, row.index, $event.target)">
          {{ row.value }}
          <div class="cert-needs-attn-decoration"/>
        </div>
        <div
          v-else-if="row.value === 'Complete'"
          class="cert-completed text-decoration-underline text-bold cursor-pointer"
          @click="openCertsDecriptionModal(row.item, row.index, $event.target)">
          {{ row.value }}
        </div>
        <div
          v-else
          class="cert-not-completed text-decoration-underline text-bold cursor-pointer"
          @click="openCertsDecriptionModal(row.item, row.index, $event.target)">
          {{ row.value }}
          <div class="cert-not-completed-decoration"/>
        </div>
      </template>

      <template
        slot="type"
        class="disable-small"
        slot-scope="row">
        <div
          v-if="row.value === 'Needs Attention'"
          class="cert-needs-attn text-decoration-underline text-bold cursor-pointer"
          @click="openCertsDecriptionModal(row.item, row.index, $event.target)">
          {{ row.value }}
          <div class="cert-needs-attn-decoration"/>
        </div>
      </template>

      <template
        v-if='!certificationsLoaded'
        class="cert-not-completed">
        <p>Loading your Certifications...</p>
      </template>

    </b-table>

    <!-- details modal -->
    <AppModal
      id="my-certs-details-modal"
      modal-ref="my-certs-details-modal"
      :hide-footer="true"
      :title="modalSettings.title">
      <b-row>
        <b-col md="4">
          <b-row class="font-weight-bold">
            Application #
          </b-row>
          <b-row>
            {{ modalSettings.info.number }}
          </b-row>
        </b-col>
        <b-col md="4">
          <b-row class="font-weight-bold">
            Application Type
          </b-row>
          <b-row>
            {{ modalSettings.info.type }}
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-row class="font-weight-bold">
            Status
          </b-row>
          <b-row
            v-if="modalSettings.info.status === 'Needs Attention'"
            class="cert-needs-attn">
            {{ modalSettings.info.status }}
          </b-row>
          <b-row
            v-else-if="modalSettings.info.status === 'Complete'"
            class="cert-completed">
            {{ modalSettings.info.status }}
          </b-row>
          <b-row
            v-else
            class="cert-not-completed">
            {{ modalSettings.info.status }}
          </b-row>
        </b-col>
        <b-col md="4">
          <b-row class="font-weight-bold">
            Submitted
          </b-row>
          <b-row>
            {{ modalSettings.info.submitted }}
          </b-row>
        </b-col>
        <b-col md="4">
          <b-row class="font-weight-bold">
            Updated
          </b-row>
          <b-row>
            {{ modalSettings.info.updated }}
          </b-row>
        </b-col>

      </b-row>
    </AppModal>

    <!--if No Certifications-->
    <div v-if="(certifications.length === 0 && certificationsLoaded)">No certifications...</div>

    <!--pagination-->
    <b-row
      v-if="certificationsLoaded"
      class="text-center">
      <b-col
        md="12"
        class="my-1">
        <b-pagination
          align="center"
          :total-rows="datatableSettings.totalRows"
          :per-page="datatableSettings.perPage"
          v-model="datatableSettings.currentPage"
          class="my-0"/>
      </b-col>
    </b-row>

  </AppWrapper>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { AppWrapper, AppPlaceholderContent, AppModal } from '../wadk/WADK';
  import storeModule from './store/index';

  const moduleName = 'MyCertifications';

  export default {
    name: moduleName,
    components: {
      AppWrapper,
      AppPlaceholderContent,
      AppModal,
    },
    data() {
      return {
        datatableSettings: {
          fields: [
            {
              key: 'number',
              label: 'Applic. #',
              sortable: true,
              sortDirection: 'desc',
            },
            {
              key: 'status',
              label: 'Status',
              sortable: true,
              sortDirection: 'desc',
            },
            {
              key: 'submitted',
              label: 'Submitted',
              sortable: true,
              sortDirection: 'desc',
            },
            {
              key: 'updated',
              label: 'Updated',
              sortable: true,
              sortDirection: 'desc',
              class: 'd-none',
            },
            {
              key: 'type',
              label: 'Type',
              sortable: true,
              sortDirection: 'desc',
              class: 'd-none',
            },
            // Will need these for Large view
            /* {
                key: 'number',
                label: 'Application #',
                sortable: true,
                sortDirection: 'desc',
              },
            {
              key: 'download',
              label: 'Download',
              sortable: true,
              sortDirection: 'desc',
            }, */
          ],
          currentPage: 1,
          perPage: 5,
          pageOptions: [5, 10, 15, 20],
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
        },
        modalSettings: {
          title: 'My Certifications',
          index: 0,
          info: {
            number: '',
            type: '',
            status: '',
            submitted: '',
            updated: '',
          },
        },
      };
    },
    computed: {
      ...mapGetters({
        getUser: 'getUser',
      }),
      ...mapGetters(moduleName, {
        certifications: 'getCertifications',
      }),
      certificationsLoaded: {
        get() {
          return this.certifications.length > 0;
        },
      },
      totalRows: {
        get() {
          return this.certifications.length;
        },
      },
    },
    methods: {
      ...mapActions([
      ]),
      ...mapActions(moduleName, [
        'loadMyCertifications',
      ]),
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      openCertsDecriptionModal(item, index, button) {
        this.modalSettings.index = index;
        this.modalSettings.info.number = item.number;
        this.modalSettings.info.type = item.type;
        this.modalSettings.info.status = item.status;
        this.modalSettings.info.submitted = item.submitted;
        this.modalSettings.info.updated = item.updated;
        this.$root.$emit('bv::show::modal', 'my-certs-details-modal', button);
      },
      closeCertsDecriptionModal() {
        this.$root.$emit('bv::hide::modal', 'my-certs-details-modal');
      },
    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    },
    mounted() {
      this.loadMyCertifications();
      console.log(this.certifications);
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
  @import "../../styles/my-certifications";
  /* To import images */
  h2::before {
    content: url('../../assets/images/state-government.svg');
  }

  .cert-needs-attn-decoration,
  .cert-not-completed-decoration{
    height: .8rem;
    width: .8rem;
    color: #fff;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 50%;
    padding: 0;
    border-width: 0;
    float: right;
    position: relative;
    top: -1rem;
    left: .9rem;
  }

  .disable-small {
    display: none !important;
  }

  .cert-not-completed-decoration {
    background-size: .5rem;
    background-image: url('../../assets/images/mycert-question.svg');
  }
  .cert-needs-attn-decoration {
    background-size: .35rem;
    background-image: url('../../assets/images/mycert-exclamation.svg');
  }

  /* Fixes bottom of workbench grey area */
  #app {
    margin-bottom: 7rem;
  }
</style>

