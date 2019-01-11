<template>
  <div id="basic-page-container">
    <h1 v-if="basicPages[0]">{{page.title[0].value}}</h1>
    <div
      v-if="basicPages[0]"
      v-html="page.body[0].value"
      id="basic-page">
    </div>
    <AppPlaceholderContent
      v-if="!basicPages[0]"
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
    name: "basic-page",
    components: {
      AppPlaceholderContent,
    },
    props: {
      urlAlias: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters({
        basicPages: 'getBasicPagesArray',
      }),
      page () {
        return this.basicPages.find(page => page.path[0].alias.replace(/\\|\//g,'') === this.urlAlias);
      },
    },
    mounted() {
      console.log(this.basicPages.find(page => page.path[0].alias.replace(/\\|\//g,'') === this.urlAlias));
    }
  };
</script>

<style scoped>

</style>