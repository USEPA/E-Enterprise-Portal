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
      class="no-top-border no-bottom-border no-sort-images bootstrap-vue-mycerts-table-scroll"
      tbody-class="my-certs-tbody"
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
          v-if="row.value === 'Complete'"
          class="text-success text-decoration-underline text-bold cursor-pointer"
          @click="openCertsDecriptionModal(row.item, row.index, $event.target)">
          {{ row.value }}
        </div>
        <div
          v-else
          class="text-primary text-decoration-underline text-bold cursor-pointer"
          @click="openCertsDecriptionModal(row.item, row.index, $event.target)">
          {{ row.value }}
          <div class="cert-not-completed-decoration"/>
        </div>
      </template>
      <template
              slot="partner_id"
              slot-scope="row">
        <div
                class="text-primary text-decoration-underline text-bold cursor-pointer"
                @click="openCertsDecriptionModal(row.item, row.index, $event.target)">
          {{ row.value }}
        </div>
      </template>
      <template
        v-if='!certificationsLoaded'>
        <p>Loading your Certifications...</p>
      </template>
    </b-table>

    <!--if No Certifications-->
    <div v-if="(certifications.length === 0 && certificationsLoaded)">No certifications...</div>

    <!--pagination-->
    <b-row
      v-if="totalRows > datatableSettings.perPage"
      class="text-center">
      <b-col
        md="12"
        class="my-1">
        <b-pagination
          align="center"
          :total-rows="totalRows"
          :per-page="datatableSettings.perPage"
          v-model="datatableSettings.currentPage"
          class="my-0"/>
      </b-col>
    </b-row>

    <!-- details modal -->
    <AppModal
      id="my-certs-details-modal"
      class="m-1"
      modal-ref="my-certs-details-modal"
      :hide-footer="true"
      :title="modalSettings.title">
      <div class="my-cert-modal-base-info mb-3">
        <b-row class="mb-2">
          <b-col md="8">
            <b-row>
              <b-col>
              Application #
              </b-col>
              <b-col>
                Application Type
              </b-col>
            </b-row>
            <b-row class="font-weight-bold">
              <b-col>
                {{ modalSettings.info.partner_id }}
              </b-col>
              <b-col>
                {{ modalSettings.info.report_type }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="pb-1">
          <b-col>
            <b-row>
              <b-col>
                Status
              </b-col>
              <b-col>
                Submitted
              </b-col>
              <b-col>
                Last Updated
              </b-col>
            </b-row>
            <b-row class="font-weight-bold">
              <b-col>
                {{ modalSettings.info.status }}
              </b-col>
              <b-col>
                {{ modalSettings.info.submitted }}
              </b-col>
              <b-col>
                {{ modalSettings.info.updated }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <div
        v-if="modalSettings.info.status !== 'Received'"
        class="my-cert-inner-switch  mb-5">
        <b-row v-if="modalSettings.info.status === 'Approved'">
          <b-col>
            <b-row>
              <b-col class="mb-1">
                Download
              </b-col>
            </b-row>
            <b-row
              v-for="(document) in modalSettings.info.documents">
              <b-col>
                <a
                  :href="modalSettings.info.certificateDownloadUrl"
                  @click="downloadCertificate(document)"
                  class="text-primary text-decoration-underline text-bold cursor-pointer"
                  >{{document.anchorName}}</a>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <div class="my-cert-modal-footer">
        <b-row class="mb-3">
          <b-col>
            <b-row>
              <b-col>
              What's Next?
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <a
                  href="https://www.epa.gov/lead/renovation-repair-and-painting-program-contractors"
                  target="_blank"
                  class="font-weight-bold">
                  Visit the EPA Lead website for next steps
                </a>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-row>
              <b-col>
              Questions or need help?
              </b-col>
            </b-row>
            <b-row>
              <b-col>
              Lead Help Desk: leadhelpdesk@epa.gov
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </AppModal>

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
              key: 'partner_id',
              label: 'Application #',
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
          ],
          currentPage: 1,
          perPage: 5,
          pageOptions: [5, 10, 15, 20],
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null
        },
        modalSettings: {
          title: 'My Certifications',
          index: 0,
          info: {
            partner_id: '',
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
        'downloadDocument',
      ]),
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      openCertsDecriptionModal(item, index, button) {
        this.modalSettings.index = index;
        this.modalSettings.info.partner_id = item.partner_id;
        this.modalSettings.info.report_type = item.report_type;
        this.modalSettings.info.status = item.status;
        this.modalSettings.info.submitted = item.submitted;
        this.modalSettings.info.updated = item.updated;
        item.documents.forEach((document, index) => {
          if (document.name.indexOf('Certificate') >= 0) {
            item.documents[index].anchorName = "Certificate";
          } else {
            item.documents[index].anchorName = "Logo";
          }
        });
        this.modalSettings.info.documents = item.documents;
        this.$root.$emit('bv::show::modal', 'my-certs-details-modal', button);
        this.$ga.event('eportal', 'click', `My Certifications Certificate Description Modal`, 1)
      },
      downloadCertificate(documentObject) {
        this.downloadDocument(documentObject);
        this.$ga.event('eportal', 'click', `My Certifications Certificate Download`, 1)
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
  /* To import images */
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
  }

  .cert-not-completed-decoration {
    background-size: .5rem;
    background-image: url('../../assets/images/mycert-question.svg');
  }

  .cert-needs-attn-decoration {
    background-size: .25rem;
    background-image: url('../../assets/images/mycert-exclamation.svg');
  }

  /* Fixes bottom of workbench grey area */
  #app {
    margin-bottom: 7rem;
  }
</style>

