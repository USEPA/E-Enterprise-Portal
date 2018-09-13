<template>
  <div class="container-fluid section">
    <div class="row">
      <h3>{{ getContaminantTitle }}</h3>
      <template v-for="(contaminant, key, index) in flowchartContaminants(section)">
        <div
          class="contaminant-wrapper col-md-6"
          :key="key">
          <label
            class="">{{ contaminant._attributes.Test }}</label>
          <!-- @TODO finish form input -->
          <input
            class=""
            type="number"
            step="0.001"
            aria-describedby="ddl-As">
          <select
            class="column one-third"
            name="RoutineContaminants[As][Unit]"
            id="ddl-As"
            aria-label="Select units for Arsenic ">
            <option value="g/L">g/L</option>
            <option
              value="mg/L"
              selected=""
              class="default">mg/L
            </option>
            <option value="µg/L">µg/L</option>
            <option value="ppm">ppm</option>
            <option value="ppb">ppb</option>
          </select>
          <template
            v-if="(index > maxColumnCount)"
            html="</div><div class='col-md-6'>">
          </template>
        </div>
      </template>
      <div class="col-md-6">

      </div>
      <div class="col-md-6">
        One of three columns
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';

  const name = 'BeWellInformed';

  export default {
    name: 'ContaminantSection',
    props: {
      section: {
        required: true,
        type: String,
      },
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        partnerResource: 'BeWellInformed/getPartnerResource',
        flowchartContaminants: 'BeWellInformed/getFlowchartContaminants',
      }),
      getContaminantTitle() {
        let r = '';

        if (this.partnerResource && this.partnerResource.flowchart &&
          this.partnerResource.flowchart.Sections) {
          const { Sections: { sections } } = this.partnerResource.flowchart;

          r = (sections && sections[this.section])
            // eslint-disable-next-line no-underscore-dangle
            ? sections[this.section].Name._text
            : '';
        }

        return r;
      },
      maxColumnCount() {
        return Math.floor(this.flowchartContaminants(this.section).length / 2);
      },
    },
    methods: {
      ...mapActions(name, [
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
      ]),
    },
  };
</script>
