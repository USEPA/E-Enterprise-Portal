<template>
  <div id="FAQs-container">
    <div
      v-if="basicPages.pagesArray[0]"
      v-html="filteredBasicPages"
      id="FAQs">
    </div>
    <AppPlaceholderContent
      v-if="!basicPages.pagesArray[0]"
      :repeatitions="3">
      <div
        v-for="i in 3"
        :key="i"
        class="row my-5">
        <h5 class="col-md-12 pulse"></h5>
        <div
          v-for="j in 3"
          :key="`${j}-left`"
          class="col-md-6">
          <div class="row m-2">
            <div class="col-12 pulse"></div>
          </div>
        </div>
        <div
          v-for="j in 3"
          :key="`${j}-right`"
          class="col-md-6">
          <div class="row m-2">
            <div class="col-12 pulse"></div>
          </div>
        </div>
      </div>
      <hr>
    </AppPlaceholderContent>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import { AppPlaceholderContent } from '../modules/wadk/WADK';

  export default {
    name: "faqs",
    components: {
      AppPlaceholderContent,
    },
    computed: {
      ...mapGetters({
        apiURL: 'getEnvironmentApiURL',
        basicPages: 'getBasicPages',
        filteredBasicPages: 'getFilteredBasicPages',
      }),
    },
  };
</script>

<style scoped>

</style>