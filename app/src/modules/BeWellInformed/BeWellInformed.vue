<template>
  <div>
    <AppWrapper :eep-app="eepApp">
      <select
        class="form-control">
        <option
          v-for="entity in statesAndTribes"
          :key="entity.name"
          :value="entity.code">{{ entity.name }}</option>
      </select>
      <div
        id="bwi-widget-state-content"
        class="py-2"
        v-html="eepApp.html.mainCard">
      </div>
      <button
        type="submit"
        class="btn btn-primary">Check Your Water</button>
    </AppWrapper>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { AppWrapper, AppAxios, commonAppStore, dynamicModule } from '../adk/ADK';
  import storeModule from './store/index';

  const name = 'BeWellInformed';

  export default {
    name: 'BeWellInformed',
    components: {
      AppWrapper,
    },
    beforeCreate() {

    },
    // extends: dynamicModule(name),
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[name])) {
        console.log(`registering module: ${name}`, storeModule);
        store.registerModule(name, storeModule);
      } else {
        console.log(`reusing module: ${name}`);
      }
      this.fetchStatesAndTribes();
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
        statesAndTribes: 'BeWellInformed/getStateAndTribes',
      }),
    },
    methods: {
      /*...mapActions(name, {
        fetchStatesAndTribes: 'BeWellInformed/fetchStatesAndTribes',
      }),*/
      ...mapActions(name, ['fetchStatesAndTribes']),
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
