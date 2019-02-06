<template>
  <div :id="urlAlias">
    <h1 v-if="basicPages[0]">{{ page.title[0].value }}</h1>
    <div
      v-if="basicPages[0]"
      v-html="page.body[0].value"
      id="basic-page-content"/>
    <AppPlaceholderContent
      v-if="!basicPages[0]"
      :repeatitions="3">
      <div
        v-for="i in 3"
        :key="i"
        class="row my-5">
        <h5 class="col-md-12 pulse"/>
        <div
          v-for="j in 3"
          :key="`${j}-left`"
          class="col-md-6">
          <div class="row m-2">
            <div class="col-12 pulse"/>
          </div>
        </div>
        <div
          v-for="j in 3"
          :key="`${j}-right`"
          class="col-md-6">
          <div class="row m-2">
            <div class="col-12 pulse"/>
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

  require('../../node_modules/uswds/dist/js/uswds');

  export default {
    name: 'BasicPage',
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
      page() {
        return this.basicPages.find(page => page.path[0].alias.replace(/\\|\//g, '') === this.urlAlias);
      },
    },
  };
</script>

<style scoped
  lang="scss">
  h2 + p,
  h2 + table,
  p + pre {
    margin-top: 5px;
  }

  pre + h2 {
    margin-top: 2em;
  }

  pre {
    margin-left: 0;
    overflow: auto;
    max-height: 200px;
    padding: 20px;
    background-color: #fcf6db;
    border: 1px solid #e5e0c6;
    font-size: 0.85em;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  table {
    td {
      vertical-align: top;
    }

    ol {
      margin-top: 0;
      margin-bottom: 0;

      li {
        margin-top: 0;
        margin-bottom: 0.5rem;
        background-color: transparent;

        &:before {
          font-weight: normal;
        }
      }
    }
  }
</style>
