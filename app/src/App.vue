<template>
  <div
    id="app">
    <MainHeader/>
    <div class="container">
      <div
        id="nav"
        class="region-navigation pb-2 px-3">
        <router-link to="/">Home</router-link>
        <span class="divider">|</span>
        <router-link to="/about">About</router-link>
        <span class="divider">|</span>
        <router-link to="/workbench">Workbench</router-link>
      </div>
      <div
        id="main-content"
        class="no-gutters py-2">
        <router-view/>
      </div>
    </div>
    <MainFooter/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MainHeader from '@/components/MainHeader.vue';
  import MainFooter from '@/components/MainFooter.vue';

  export default {
    name: 'App',
    components: {
      MainHeader,
      MainFooter,
    },
  };
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import '../node_modules/open-iconic/font/css/open-iconic-bootstrap.css';
  @import './styles/styles.scss';

  .region-navigation {
    color: #ffffff;
    text-shadow: -1px 0 1px rgba(0,0,0, 0.5);
    background-color: #0071bc;
    // background-color: #007bff;
    height: auto;
    font-size: 1.5rem;

    a {
      @extend small;
      color: #fff;
      text-shadow: none;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .divider {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>
