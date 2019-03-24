<template>
  <b-container class="pl-0 outerContainer">
    <b-row class="tabContainer">
      <div v-for="account in loginViewAccounts">
        <!-- v-if -->
        <template v-if="account.weight == index">
          <b-col class="pb-1 col-md-auto">
            <a class="link"
              href="javascript:void(0);"
              @click="navigateToBridge(account.data.field_urn[0].value)">
              <div class="link-wrapper" tabindex="0">
                <img :src="account.data.field_option_image[0].url"
                  alt="not found">
                <span class="pl-2">{{account.data.title[0].value}}</span>
              </div>
            </a>
          </b-col>
          <div class="w-100 d-block d-md-none py-1"
            v-if="index % 3 == 0"></div>
        </template>
      </div>
    </b-row>
  </b-container>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal, AppPlaceholderContent } from '../modules/wadk/WADK';
  import { EventBus } from '../EventBus';

  export default {
    name: 'LoginType',
    props: ['index'],
    components: {
      AppWrapper,
    },
    beforeCreate() {
    },
    created() {
    },
    data() {
      return {};
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        loginViewAccounts: 'getLoginViewAccounts',
      }),
    },
    methods: {
      ...mapActions([
        'navigateToBridge',
      ]),
    },
  }

</script>

<style scoped
  lang="scss">

  @media only screen and (min-width: 500px) {
    .outerContainer {
      margin-top: -2.2rem; // Move buttons up to align with buttons on left
    }
  }

  .link {
    color: #fff;
    text-decoration: none;
    display: block;
  }

  .link-wrapper {
    background-color: #aeb0b6;
    cursor: pointer;
    width: 232px;
    padding: 13px;
    color: #fff;

    &:hover {
      background-color: #094e7a;
    }

    img {
      height: 24px;
      width: 24px;
    }
  }

</style>