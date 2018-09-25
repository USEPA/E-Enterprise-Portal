<template>
  <div class="section mb-4">
    <div
      v-if="flowchartContaminants(section)"
      class="row">
      <h5 class="col-md-12">{{ getContaminantTitle }}</h5>
      <template v-for="(contaminant, key, index) in flowchartContaminants(section)">
        <div
          class="contaminant-wrapper col-md-6"
          :key="key">
          <div class="row no-gutters my-2">
            <div class="col-sm-5">
              <label class="">{{ contaminant._attributes.Text }}</label>
            </div>
            <div class="col-sm-3">
              <b-form-input
                :ref="`${contaminant._attributes.Value}-Value`"
                :id="`${contaminant._attributes.Value}-Value`"
                type="number"
                step="0.001"
                size="lg"
                @change="updateProperty( section, contaminant, 'Value', $event)" />
            </div>
            <div class="col-sm-4">
              <b-form-select
                :value="contaminant._attributes.DefaultUnit"
                @change="updateProperty( section, contaminant, 'Unit', $event)"
                size="lg">
                <template v-for="unit in contaminant._attributes.Units.split('|')" >
                  <option
                    :key="unit"
                    :value="unit" >{{ unit }}</option>
                </template>
              </b-form-select>
            </div>
          </div>
          <div
            v-if="canShowIsPresent(contaminant)"
            class="row justify-content-end">
            <b-form-group
            class="col text-right">
              <b-form-radio-group
                :ref="`${contaminant._attributes.Value}-ShowIsPresent`"
                :id="`${contaminant._attributes.Value}-ShowIsPresent`"
                @change="updateProperty( section, contaminant, 'Present', $event)"
                :name="`${contaminant._attributes.Value}-ShowIsPresent`">
                <b-form-radio value="true">Present</b-form-radio>
                <b-form-radio value="false">Absent</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
          <hr>
          <!-- @note - This template provides the break in the two column layout that divides
            contaminants
           -->
          <template
            v-if="(index > maxColumnCount)"
            html="</div><div class='col-md-6'>">
          </template>
        </div>
      </template>
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
        waterAnalysisRequest: 'BeWellInformed/getWaterAnalysisRequest',
      }),
      getContaminantTitle() {
        let r = '';

        if (this.partnerResource && this.partnerResource.flowchart
          && this.partnerResource.flowchart.FlowCharts
          && this.partnerResource.flowchart.FlowCharts.Sections) {
          const sections = this.partnerResource.flowchart.FlowCharts.Sections;

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
      updateProperty: vm => (
 section, contaminant, property, event,
) => {
        if (contaminant._attributes.ShowIsPresent && (event === 'false')) {
          vm.$refs[`${contaminant._attributes.Value}-Value`].forEach(input => input.setValue(''));
        }
        vm.updateWaterAnalysisRequestProperty({
         section, contaminant, property, event,
        });
      },
    },
    methods: {
      ...mapActions(name, [
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
        'updateWaterAnalysisRequestProperty',
      ]),
      canShowIsPresent(contaminant) {
        const r = (
          contaminant
          && contaminant._attributes
          && contaminant._attributes.hasOwnProperty('ShowIsPresent')
          && contaminant._attributes.ShowIsPresent
        ) ? true : false;
        return r;
      },
    },
  };
</script>

<style
  lang="scss">

  .contaminant-wrapper {
    hr {
      margin: 0;
      border: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
</style>
