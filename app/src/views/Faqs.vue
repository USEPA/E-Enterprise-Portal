<template>
  <div id="FAQs-container">
    <div
      v-if="basicPages.pagesArray[0]"
      v-html="basicPages.pagesArray
        .filter(filterPageArrayByUuid)[0].body[0].value"
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
        currentPageUuid: 'getCurrentPageUuid',
      }),
    },
    methods: {
      filterPageArrayByUuid(item) {
        return item.uuid[0].value === this.currentPageUuid;
      }
    },
  };
</script>

<style scoped>

</style>