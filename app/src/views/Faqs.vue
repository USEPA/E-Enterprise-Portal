<template>
  <div id="FAQs"></div>
</template>

<script>

  import AppAxios from '../modules/wadk/utils/AppAxios.js';
  import { mapGetters, mapActions} from 'vuex';

  export default {
    name: "faqs",
    computed: {
      ...mapGetters({
        apiURL: 'getEnvironmentApiURL',
      }),
    },
    methods: {
      ...mapActions([
        'performDrupalAPIGETRequest',
      ]),
    },
    mounted() {
      this.performDrupalAPIGETRequest([this.apiURL + '/api_faqs?_format=json', 'FAQs']);
    },
  }
</script>

<style scoped>

</style>