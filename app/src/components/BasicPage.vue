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

  // needed for accordions
  import * as uswds from 'uswds';

  import { mapGetters } from 'vuex';
  import { AppPlaceholderContent } from '../modules/wadk/WADK';


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
        const vm = this;

        return vm.basicPages.find((page) => {
          let isValid = false;
          if (page.path
            && page.path[0]
            && page.path[0].alias
            && page.path[0].alias.replace(/\\|\//g, '') === this.urlAlias) {
            isValid = true;
          }
          return isValid;
        });
      },
    },
  };
</script>
<style>
  .usa-accordion__button {

    background-color: transparent;
    border: 0;
    border-radius: 0;
    font-weight: 400;
    margin: 0;
    padding: 0;
    text-align: left;
    -webkit-font-smoothing: auto;
    background-color: #f1f1f1;
    background-position: right 2rem center;
    background-repeat: no-repeat;
    background-size: 1.5rem;
    color: #212121;
    cursor: pointer;
    display: inline-block;
    font-family: "Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
    font-weight: 700;
    margin: 1rem;
    padding: 1.5rem 5.5rem 1.5rem 2rem;
    width: 100%;
  }
  .usa-accordion-content {
    background-color: #ffffff;
    overflow: auto;
    padding: 1.5rem 2rem;
  }
</style>
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
