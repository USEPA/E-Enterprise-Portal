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
  @import '../node_modules/';
  @import './styles/styles.scss';

  .region-navigation {
    color: #ffffff;
    text-shadow: -1px 0 1px rgba(0,0,0, 0.5);
    background-color: #0071bc;
    // background-color: #007bff;
    height: auto;
    font-size: 1.5rem;
    /*
    background-image: -webkit-gradient(linear, left top, left bottom,
      from(rgba(255,255,255,0.2) 0%),
      to(rgba(0,0,0,0.15) 100%));
    background-image: -webkit-linear-gradient(top, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.15) 100%);
    background-image: -moz-linear-gradient(top, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.15) 100%);
    background-image: -ms-linear-gradient(top, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.15) 100%);
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.15) 100%);
    -moz-box-shadow: 0px 1px 5px #5b616b;
    -webkit-box-shadow: 0px 1px 5px #5b616b;
    box-shadow: 0px 1px 5px #5b616b;
    filter:
      progid:DXImageTransform.Microsoft.Blur(PixelRadius=3, MakeShadow=true, ShadowOpacity=0.30);
    -ms-filter:
      "progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)";
    zoom: 1;
    */

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
