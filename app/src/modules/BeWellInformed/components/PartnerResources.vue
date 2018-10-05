<template>
  <div class="bwi-partner-resources">
    <h3>State/Tribe Resources</h3>
    <br/>
    <div v-if="(partnerResource && partnerResource.info)">
      <template
        v-for="(section, key) in partnerResource.info.Partner.SupportInformation.Section">
        <div
          class="card mb-3"
          :key="key">
          <div
            class="card-body"
            v-html="section._cdata"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  const name = 'BeWellInformed';

  export default {
    name: 'PartnerResources',
    components: {},
    created() {
    },
    computed: {
      ...mapGetters({
        partners: 'BeWellInformed/getPartners',
        selectedPartner: 'BeWellInformed/getSelectedPartner',
        partnerResource: 'BeWellInformed/getPartnerResource',
      }),
    },
    methods: {
      ...mapActions(name, [
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
        'createWaterAnalysisRequest',
      ]),
    },
  };
</script>

<style
  lang="scss">
  @import '../../../styles/bootstrap-variable-overrides.scss';
  .bwi-partner-resources {
    .card {
      h4 {
        margin: -1.25rem -1.25rem 1.25rem;
        padding: .5rem 1.25rem;
        background-color: $blue;
        color: $white;
      }
    }
  }
  .bwi-resource-name {
    font-weight: 700;
  }
  .plain-list {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin: 1.25rem 0;
      display: block;
    }

    p {
      margin: 0 30px;
      line-height: 1.4;
    }
  }
</style>
