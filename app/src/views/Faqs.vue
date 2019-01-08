<template>
  <div id="FAQs"></div>
</template>

<script>

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
        'drupalAPIGETRequest',
      ]),
    },
    mounted() {
      this.drupalAPIGETRequest([this.apiURL + '/api_faqs?_format=json', 'FAQs']);
    },
  }
</script>

<style scoped>

</style>