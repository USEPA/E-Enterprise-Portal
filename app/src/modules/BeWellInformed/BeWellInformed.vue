<template>
  <div>
    <AppWrapper :eep-app="eepApp">
      <b-form
        class="needs-validation"
        validated>
        <b-form-select
          :value="selectedPartner"
          :options="partners"
          @change="setSelectedPartner"
          class="mb-3">
          <template slot="first">
            <!-- this slot appears above the options from 'options' prop -->
            <option
              :value="null"
              disabled>-- Please select an partner --</option>
          </template>
        </b-form-select>
        <div
          id="bwi-widget-state-content"
          class="py-2"
          v-html="eepApp.html.mainCard">
        </div>
        <b-btn
          variant="primary"
          ref="btnCheckYourWater"
          @click="onCheckYourWater">
          Check Your Water
        </b-btn>
      </b-form>
      <!-- Various Modals required for the workbench app-->
      <AppModal
        id="bwi-modal"
        modal-ref="bwi-modal"
        title="Be Well Informed Water Analysis Tool">
        <b-tabs>
          <b-tab
            title="Entry"
            active>
            <PartnerForm/>
          </b-tab>
          <b-tab title="State/Tribe Resources" >
            <br>I'm the second tab content
          </b-tab>
          <b-tab
            title="Results"
            disabled>
            <br>Disabled tab!
          </b-tab>
        </b-tabs>
      </AppModal>
    </AppWrapper>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal } from '../adk/ADK';
  import storeModule from './store/index';
  import PartnerForm from './components/PartnerForm.vue';

  const name = 'BeWellInformed';

  export default {
    name: 'BeWellInformed',
    components: {
      AppWrapper,
      AppModal,
      PartnerForm,
    },
    beforeCreate() {

    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[name])) {
        store.registerModule(name, storeModule);
      }
      this.fetchPartners();
    },
    data() {
      return {
        eepApp: {
          id: 'be-well-informed',
          title: 'Be Well Informed',
          source: {
            text: 'New Hampshire’s Be Well Informed Guide',
            link: 'https://xml2.des.state.nh.us/DWITool/Welcome.aspx',
          },
          html: {
            mainCard:
              '<p>Have a well and wonder what your water testing results mean?</p>\n' +
              '<p>\n' +
              '  Be Well Informed lets you enter your test results and get feedback about health\n' +
              '  concerns and water treatment choices. Be Well Informed includes useful information about\n' +
              '  the most common contaminants that affect wells.\n' +
              '</p>\n' +
              '<p>\n' +
              '  A quick disclaimer before we start: Information provided by the participating States\n' +
              '  is for informational purposes only. It is recommended that you consult a qualified water\n' +
              '  treatment professional if you need to treat your water. They can consider other\n' +
              '  conditions or factors related to your well or home to determine the most appropriate\n' +
              '  water treatment option.\n' +
              '</p>\n' +
              '<p class="widget-note powered-by-nhbwi">Modeled After:\n' +
              '  <a\n' +
              '    href="https://xml2.des.state.nh.us/DWITool/Welcome.aspx"\n' +
              '    target="_blank">New Hampshire’s Be <em>Well</em> Informed Guide</a>\n' +
              '</p>',
          },
        },
      };
    },
    computed: {
      ...mapGetters({
        partners: 'BeWellInformed/getPartners',
        partnerXmls: 'BeWellInformed/getPartnerXmls',
        selectedPartner: 'BeWellInformed/getSelectedPartner',
        partnerResource: 'BeWellInformed/getPartnerResource',
      }),
    },
    methods: {
      ...mapActions(name, [
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
      ]),
      onCheckYourWater() {
        const partner = this.selectedPartner;
        this.fetchPartnerAndFlowchartXML(partner.code);
        this.$root.$emit(
          'bv::show::modal', 'bwi-modal', this.$refs.btnCheckYourWater,
        );
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
  lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
