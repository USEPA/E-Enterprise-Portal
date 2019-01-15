<template>
  <div>
    <AppWrapper class="pb-5"
      :eep-app="eepApp">
      <div
        v-html="eepApp.html.mainCard"
        class="pb-2">
      </div>
      <nav>
        <div class="nav nav-tabs nav-fill"
          id="nav-tab"
          role="tablist">
          <a class="nav-item nav-link active"
            data-toggle="tab"
            href="#nav-epa"
            role="tab"
            aria-controls="nav-epa"
            aria-selected="true">US EPA</a>
          <a class="nav-item nav-link"
            data-toggle="tab"
            href="#nav-state"
            role="tab"
            aria-controls="nav-state"
            aria-selected="false">State</a>
          <a class="nav-item nav-link"
            data-toggle="tab"
            href="#nav-tribal"
            role="tab"
            aria-controls="nav-tribal"
            aria-selected="false">Tribal</a>
          <a class="nav-item nav-link"
            data-toggle="tab"
            href="#nav-local"
            role="tab"
            aria-controls="nav-local"
            aria-selected="false">Local</a>
        </div>
      </nav>
      <div class="tab-content"
        id="nav-tabContent">
        <div class="tab-pane fade show active"
          id="nav-epa"
          role="tabpanel"
          aria-labelledby="nav-epa-tab">
        </div>
        <div class="tab-pane fade"
          id="nav-state"
          role="tabpanel"
          aria-labelledby="nav-state-tab">
        </div>
        <div class="tab-pane fade"
          id="nav-local"
          role="tabpanel"
          aria-labelledby="nav-local-tab">
        </div>
        <div class="tab-pane fade"
          id="nav-tribal"
          role="tabpanel"
          aria-labelledby="nav-tribal-tab">
        </div>
      </div>
      <div>
        <ul class="inline-cdx-links">
          <li class="my-cdx-login"><a class="my-cdx-web-handoff-link"
            data-handoff-type="login"
            href="#">My CDX</a></li>
          <li class="my-cdx-inbox"><a class="my-cdx-web-handoff-link"
            data-handoff-type="inbox"
            href="#">Inbox</a></li>
          <li class="my-cdx-alerts"><a class="my-cdx-web-handoff-link"
            data-handoff-type="alerts"
            href="#">News and Alerts</a>
          </li>
          <li class="my-cdx-profile"><a class="my-cdx-web-handoff-link"
            data-handoff-type="profile"
            href="#">My Profile</a>
          </li>
          <li class="my-cdx-submission"><a class="my-cdx-web-handoff-link"
            data-handoff-type="submission"
            href="#">Submission
            History</a></li>
        </ul>
      </div>
      <div v-for="item in program">{{ item.second }}
        <hr/>
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

  export default {
    name: moduleName,
    components: {
      AppWrapper,
    },
    beforeCreate() {

    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    },
    data() {
      return {
        eepApp: {
          id: 'my-reporting',
          title: 'My Reporting',
          source: {
            text: 'US Environmental Protection Agency',
            link: 'https://www.epa.gov/',
          },
          html: {
            mainCard:
              '<p>Report directly to your CDX data flows.</p>'

            ,
          },
        },
        program: [
          { first: '', },
          { second: '', },
        ]
      }
    },
    mounted() {
      AppAxios
        .get('https://apidev2.e-enterprise.gov/api/cdxprogramtitles')
        .then(response => (this.program = response.data[0].field_cdx_program_name))

    },
    computed: {
      ...mapGetters({
        // map getters go here
      }),
    },
    methods: {
      ...mapActions(moduleName, [
        // map actions go here
      ]),
    }
  }
</script>

<style scoped
  lang="scss">
  #app {
    margin-bottom: 7rem;
  }
  .inline-cdx-links {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin-top: 1rem;
    padding-inline-start: 0px;
  }
  .inline-cdx-links li::before {
    display: inline-flex;
    content: '';
    width: 1rem;
    height: 1rem;
    background-size: .7rem;
    background-color: #0071c2;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    margin-right: 2px;
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
  .my-cdx-web-handoff-link {font-size: .8rem;}
</style>