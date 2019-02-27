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
        slot-scope="row"
      >
        <div
          v-if="row.value === 'Needs Attention'"
          class="cert-needs-attn">{{ row.value }}</div>
        <div
          v-else-if="row.value === 'Completed'"
          class="cert-completed">{{ row.value }}</div>
        <div v-else>{{ row.value }}</div>
      </template>

      <template
        v-if='!certificationsLoaded'
        class="cert-not-completed">
        <p>Loading your Certifications...</p>
      </template>

    </b-table>

    <!-- details modal -->
    <!--<AppModal
        id="addModalInfo"
        modal-ref="addModalInfo"
        hide-footer
        :title="addModalInfo.title">
        <b-form
          id="addModalInfoForm"
          class="needs-validation"
          @submit="applyAddModal"
          novalidated>
          <label>Title
          </label>
          <b-form-input
            type="text"
            v-model="addModalInfo.first"
            required/>
          <label>Website Address (URL)
          </label>
          <b-form-input
            type="url"
            v-model="addModalInfo.second"
            required/>
          <b-btn
            class="mt-3"
            variant="primary"
            type="submit">
            save
          </b-btn>
        </b-form>

      </AppModal>

      -->

    <!--if No Certifications-->
    <div v-if="(certifications.length === 0 && certificationsLoaded)">No certifications...</div>

    <!--pagination-->
    <b-row class="text-center">
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
            // Will need these for Large view
            /* {
                key: 'number',
                label: 'Application #',
                sortable: true,
                sortDirection: 'desc',
              },
             {
              key: 'updated',
              label: 'Updated',
              sortable: true,
              sortDirection: 'desc',
            },
            {
              key: 'download',
              label: 'Download',
              sortable: true,
              sortDirection: 'desc',
            },
            {
              key: 'type',
              label: 'Type',
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
        'onFiltered',
      ]),
    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    },
    mounted() {
      this.loadMyCertifications();
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

  .cert-needs-attn:after {
    content: url('../../assets/images/exclamation.svg');
  }
  .cert-not-completed:after {
    content: url('../../assets/images/question.svg');
  }

  .cert-needs-attn:after,
  .cert-not-completed:after{
    height: .75em;
    width: .75em;
    top: -0.1rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #0071c2;
    border-radius: 50%;
    padding: 0;
    border-width: 0;
    background-size: .8rem;
  }
  /* Fixes bottom of workbench grey area */
  #app {
    margin-bottom: 7rem;
  }
</style>

