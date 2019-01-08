<template>
  <div id="FAQs"></div>
</template>

<script>

  import AppAxios from '../modules/wadk/utils/AppAxios.js';
  import { mapGetters } from 'vuex';

  export default {
    name: "faqs",
    computed: {
      ...mapGetters({
        apiURL: 'getEnvironmentApiURL',
      }),
    },
    methods: {
      generateNodeHTML(response){
        return '<h1>' + response.data.title[0].value + '</h1>' + '\n' + response.data.body[0].value;
      },
      performDrupalFAQsGETRequest() {
        const GETResultElement = document.getElementById('FAQs');
        const vm = this;
        GETResultElement.innerHTML = '';

        //gets drupal FAQs node object
        AppAxios.get(vm.apiURL + '/api_faqs?_format=json', {
          headers: {
            'crossDomain': true,
            'cache-control': 'no-cache',
            'Content-Type': 'application/hal+json',
          },
        })
          .then(response => {
            console.log('GET => success');
            GETResultElement.innerHTML = vm.generateNodeHTML(response);
            console.log(response.data.body[0].value);
          })
          .catch(error => {
            console.log('GET => failure');
            console.log(error);
          });
      },
    },
    mounted() {
      this.performDrupalFAQsGETRequest();
    },
  }
</script>

<style scoped>

</style>