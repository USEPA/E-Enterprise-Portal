<template>
  <footer
    v-bind:class="getClass()">
    <div
      v-if="footerLinksLoaded && footerLinks.length > 0"
      class="container py-2">
      <div class="row justify-content-center small">
        <div
          class="col-auto"
          v-for="item in footerLinks" >
          <a
            :href="item.second"
            target="_blank"
            class="">{{ item.first }}</a>
        </div>
      </div>
      <div class="row justify-content-center small">
        <div class="col-auto text-align-center small">
          {{ this.footerVersion[0].first }} {{ this.footerVersion[0].second }}
        </div>
      </div>
    </div>
    <div
      v-else-if="!footerLinksLoaded"
      class="container py-2">
      <div class="row justify-content-center small">
        <div
          class="col-auto">
          Loading Footer...
        </div>
      </div>
      <div class="row justify-content-center small">
        <div class="col-auto text-align-center small">
          Loading Footer...
        </div>
      </div>
    </div>
    <div
      v-else-if="footerLinksLoaded && footerLinks.length === 0"
      class="container py-2">
      <div class="row justify-content-center small">
        <div
          class="col-auto">
          Failed to load Footer.
        </div>
      </div>
      <div class="row justify-content-center small">
        <div class="col-auto text-align-center small">
          Failed to load Footer.
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  import AppAxios from 'axios';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'MainFooter',
    components: {  },
    computed: {
      ...mapGetters({
        apiUrl: 'getEnvironmentApiURL',
      }),
    },
    methods: {
      ...mapActions([
      ]),
      getClass() {
        if (this.$route.path === ('/')){
          return 'homePageFooter';
        } else {
          return 'footer';
        }
      },
    },
    data() {
      return {
        footerLinks: [],
        footerVersion: [],
        footerLinksLoaded: false,
      };
    },
    mounted() {
      AppAxios
        .get(`${this.apiUrl}/api/footer`)
        .then((response) => {
          this.footerLinks = response.data[0].field_footer_link_name;
          this.footerVersion = response.data[0].field_version;
          this.footerLinksLoaded = true;
        });
    },
  };

</script>

<style scoped
  lang="scss">
  .homePageFooter {
    color: #171717;
    background-color: #fefefe;
    a {
      color: #171717;

      &:hover, &:active {
        text-decoration: underline;
      }
    }
  }

  footer {
    color: #fefefe;
    background-color: #323a45;

    a {
      color: #fefefe;

      &:hover, &:active {
        text-decoration: underline;
      }
    }
  }

</style>
