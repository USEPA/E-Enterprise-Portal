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
        basicPages: 'getBasicPages',
      }),
    },
    methods: {
      ...mapActions([
        'drupalAPIGET',
      ]),
    },
    mounted() {
      function filterByUuid(item) {
        if (item.uuid[0].value === 'f161b85b-1896-4499-8b3a-acc7710c2e40' || item.uuid[0].value === '3bd1261a-e049-408e-9da7-966c572b045b') {
          return true;
        }
        return false;
      }
      // sets timeout to ensure state has been set
      // @TODO need to find a way to resolve this via promises
      setTimeout(() => {
        const filteredArray = this.basicPages.pagesArray.filter(filterByUuid);
        console.log(filteredArray);
        document.getElementById('FAQs').innerHTML = filteredArray[0].body[0].value;
      }, 200);
    },
  }
</script>

<style scoped>

</style>