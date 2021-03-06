<template>
  <div class="section mb-4">
    <div
      class="row">
      <h5 class="col-md-12">{{ getContaminantTitle }}</h5>
      <template v-for="(contaminant, key, index) in contaminants">
        <div
          class="contaminant-wrapper col-md-6"
          :key="key">
          <div class="row no-gutters my-2">
            <div class="col-sm-5">
              <label :for="`${contaminant._attributes.Value}-Value`"
                class="">{{ contaminant._attributes.Text }}</label>
            </div>
            <div class="col-sm-3 pr-2">
              <!-- Show fake input when we have to juggle present/absent/real values -->
              <b-form-input
                v-show="false"
                class="actual-contaminant-input"
                :ref="`${contaminant._attributes.Value}-Value`"
                :id="`${contaminant._attributes.Value}-Value`"
                type="number"
                step="0.001"
                v-model="request[contaminant._attributes.Value].Value"
                @change="updateProperty( section, contaminant, 'Value', $event)"
              />
              <!-- Show actual input when we have don't have to juggle-->
              <b-form-input
                class="fake-contaminant-input"
                :ref="`${contaminant._attributes.Value}-Value-Fake`"
                :id="`${contaminant._attributes.Value}-Value-Fake`"
                v-model="fakeInputs[contaminant._attributes.Value]"
                type="number"
                step="0.001"
                @change="updateProperty( section, contaminant, 'Value', $event)"
              />
            </div>
            <div class="col-sm-4">
              <label for="measurement-units"
                class="sr-only">Units of Measurement</label>
              <b-form-select
                id="measurement-units"
                :value="contaminant._attributes.DefaultUnit"
                v-model="request[contaminant._attributes.Value].Unit"
                @change="updateProperty( section, contaminant, 'Unit', $event)"
              >
                <template v-for="unit in contaminant._attributes.Units.split('|')">
                  <option
                    :key="unit"
                    :value="unit">{{ unit }}
                  </option>
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
                @change="updateProperty( section, contaminant, 'Value', $event)"
                v-model="radios[contaminant._attributes.Value]"
                :name="`${contaminant._attributes.Value}-ShowIsPresent`">
                <b-form-radio value="-1">Present</b-form-radio>
                <b-form-radio value="-2">Absent</b-form-radio>
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
      request: {
        required: true,
        type: Object,
      },
    },
    created() {
      const vm = this;
      vm.contaminants = vm.flowchartContaminants(vm.section);
    },
    data() {
      return {
        contaminants: {},
        fakeInputs: {},
        radios: {},
      };
    },
    computed: {
      ...mapGetters({
        partnerResource: 'BeWellInformed/getPartnerResource',
        flowchartContaminants: 'BeWellInformed/getFlowchartContaminants',
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
    },
    methods: {
      ...mapActions(name, [
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
        'updateWaterAnalysisRequestProperty',
      ]),
      canShowIsPresent(contaminant) {
        const r = !!((
          contaminant
          && contaminant._attributes
          && Object.prototype.hasOwnProperty.call(contaminant._attributes, 'ShowIsPresent')
          && contaminant._attributes.ShowIsPresent
        ));
        return r;
      },
      updateProperty(section, contaminant, property, $event) {
        const vm = this;
        vm.updateWaterAnalysisRequestProperty({
          section,
          contaminant,
          property,
          value: $event,
        })
          .then(function () {
            // If it has radio buttons and one of those values is passed, we need to clear the fake input field ;)
            if (contaminant._attributes.ShowIsPresent && ($event === '-2')) {
              vm.fakeInputs[contaminant._attributes.Value] = undefined;
            } else if (vm.radios[contaminant._attributes.Value] && ($event !== '-1' && $event !== '-2')) {
              vm.radios[contaminant._attributes.Value] = undefined;
            }
          });
      },
    },
  };

  /*
  NOTE ABOUT 'ABSENT' AND 'PRESENT':
  DO NOT DIRECTLY SET THE 'PRESENT' FIELD. THERE ARE SPECIAL VALUES THAT MUST BE STORED IN THE 'VALUE' FIELD
  THAT REPRESENT 'ABSENT' AND 'PRESENT'.  THESE VALUES ARE -2 AND -1 RESPECTIVELY.
   */

</script>

<style scoped
  lang="scss">
  .real-input {
    display: none;
  }

  .contaminant-wrapper {
    hr {
      margin: 0;
      border: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  .custom-select {
    font-family: "Source Sans Pro Web", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
  }
</style>
