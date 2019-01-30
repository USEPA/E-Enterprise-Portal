<template ref="favoriteLinks">
  <div id="favLinks">
    <AppWrapper
      :eep-app="eepApp">
      <div v-html="eepApp.html.mainCard"/>
      <b-row>
        <b-col
          md="5"
          class="my-1">
          <b-form-group
            horizontal
            label="Filter"
            class="mb-0">
            <b-input-group>
              <b-form-input
                v-model="filter"
                placeholder="Type to Search"/>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col
          md="4"
          class="my-1">
          <b-btn
            @click="openAddModal"
            class="add-favorite-btn"/>
          <div class="d-inline-block pl-1">Add a Favorite</div>
        </b-col>
        <b-col
          md="3"
          class="my-1 pr-4 pl-0">
          <b-form-group
            horizontal
            label="Rows"
            class="mb-0">
            <b-form-select
              class="ml-2"
              :options="pageOptions"
              v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>

      <!--datatable-->
      <b-table
        hover
        :items="favLinksArray"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >

        <template
          slot="first"
          slot-scope="data">
          <a
            :href="data.item.second"
            class="pl-2">{{ data.item.first }}</a>
        </template>

        <template
          v-if='favLinksArray[0].first != `Not logged in or no user ID found!` &&
          favLinksArray[0].first != `Loading your Favorites...`'
          slot="actions"
          slot-scope="row">
          <b-button
            size="sm"
            @click="deleteFavLink(row.item, row.index)"
            class="delete-favorite-btn mr-1"/>
          <b-button
            size="sm"
            @click="openEditModal(row.item, row.index, $event.target)"
            class="edit-favorite-btn mr-1"/>
        </template>

      </b-table>

      <!-- add modal -->
      <b-modal
        id="addModalInfo"
        @hide="applyAddModal"
        hide-footer
        :title="addModalInfo.title">
        <b-row>
          <b-col
            md="12"
            class="my-1">Title
          </b-col>
          <b-col
            md="12"
            class="my-1">
            <b-input v-model="addModalInfo.first"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="12"
            class="my-1">Website Address (URL)
          </b-col>
          <b-col
            md="12"
            class="my-1">
            <b-input v-model="addModalInfo.second"/>
          </b-col>
        </b-row>
        <b-btn
          class="mt-3"
          @click="closeAddModal">save
        </b-btn>

      </b-modal>

      <!-- edit modal -->
      <b-modal
        id="editModalInfo"
        @hide="applyEditModal(editModalInfo.first, editModalInfo.second)"
        hide-footer
        :title="editModalInfo.title">
        <b-row>
          <b-col
            md="12"
            class="my-1">Title
          </b-col>
          <b-col
            md="12"
            class="my-1">
            <b-input v-model="editModalInfo.first"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="12"
            class="my-1">Website Address (URL)
          </b-col>
          <b-col
            md="12"
            class="my-1">
            <b-input v-model="editModalInfo.second"/>
          </b-col>
        </b-row>
        <b-btn
          class="mt-3"
          @click="closeEditModal">save
        </b-btn>

      </b-modal>

      <!--if No Favorites-->
      <div v-if="(favLinksArray.length === 0)">{{ noFavs }}</div>

      <!--pagination-->
      <b-row class="text-center">
        <b-col
          md="12"
          class="my-1">
          <b-pagination
            align="center"
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            class="my-0"/>
        </b-col>
      </b-row>

    </AppWrapper>
  </div>
</template>

<script>
  import AppAxios from 'axios';
  import { mapGetters } from 'vuex';
  import { AppWrapper, AppPlaceholderContent } from '../wadk/WADK';
  import storeModule from './store/index';
  import { EventBus } from '../../EventBus';

  const moduleName = 'FavoriteLinks';

  export default {
    name: moduleName,
    components: {
      AppWrapper,
      AppPlaceholderContent,
    },
    data() {
      return {
        favLinksArray: [{ first: 'Loading your Favorites...' }],
        userInit: [],
        fields: [
          {
            key: 'first',
            label: 'Link',
            sortable: true,
            sortDirection: 'desc',
          },
          /* Column for widgets uncomment when implementing
          { key: 'widget', label: 'Widget', sortable: true, sortDirection: 'desc' },
          */
          {
            key: 'actions',
            label: 'Actions',
            sortable: true,
            sortDirection: 'desc',
            class: 'text-right',
          },
        ],
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        editModalInfo: { title: 'Edit Favorite', first: '', second: '' },
        editModalIndex: null,
        addModalInfo: { title: 'Add Favorite', first: '', second: '' },
        totalRows: null,
        noFavs: 'No Favorites...',
      };
    },
    computed: {
      ...mapGetters({
        apiURL: 'getEnvironmentApiURL',
      }),
      uid() { return this.getCookie('uid'); },
    },
    methods: {
      // ADD
      openAddModal(item, index, button) {
        this.$root.$emit('bv::show::modal', 'addModalInfo', button);
      },
      closeAddModal() {
        this.$root.$emit('bv::hide::modal', 'addModalInfo');
      },
      applyAddModal() {
        // stores changes in local state
        const firstField = this.addModalInfo.first.trim();
        const secondField = this.addModalInfo.second.trim();
        this.favLinksArray = this.favLinksArray.concat(
          {
            first: firstField,
            second: secondField,
          },
        );
        this.axiosPATCHInit();
      },
      // EDIT
      openEditModal(item, index, button) {
        this.editModalIndex = index;
        this.editModalInfo.first = item.first;
        this.editModalInfo.second = item.second;
        this.$root.$emit('bv::show::modal', 'editModalInfo', button);
      },
      closeEditModal() {
        this.$root.$emit('bv::hide::modal', 'editModalInfo');
      },
      applyEditModal(objTitle, objLink) {
        for (let i = 0; i < this.favLinksArray.length; i++) {
          if (this.favLinksArray[i].first === objTitle && this.favLinksArray[i].second === objLink) {
            this.editModalIndex = i;
          }
        }
        // stores changes in local state
        this.favLinksArray[this.editModalIndex].first = this.editModalInfo.first.trim();
        this.favLinksArray[this.editModalIndex].second = this.editModalInfo.second.trim();
        // pushes changes to backend
        this.axiosPATCHInit();
      },
      // DELETE
      deleteFavLink(item, index) {
        // stores changes in local state
        this.favLinksArray.splice(index, 1);
        // pushes changes to backend
        this.axiosPATCHInit();
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      getCookie(cname) {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
      },
      axiosPATCHInit() {
        if (this.userInit.length > 0 && this.userInit[0].value.indexOf('@') < 1) {
          // pushes changes to backend
          AppAxios.patch(`${this.apiURL}/user/${this.uid}?_format=json`, {
              init: [
                {
                  value: "generated-user@e-enterprise",
                },
              ],
              field_favorite_links: this.favLinksArray,
            },
            {
              headers: {
                crossDomain: true,
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
              },
              // @TODO set auth up to pass/accept jwt_token
              auth: {
                username: 'api_user',
                password: 'api4epa',
              },
            })
            .then(() => {
              console.log('PATCH => success');
            })
            .catch(() => {
              console.log('PATCH => failure');
            });
        } else {
          // pushes changes to backend
          AppAxios.patch(`${this.apiURL}/user/${this.uid}?_format=json`, {
              init: this.userInit,
              field_favorite_links: this.favLinksArray,
            },
            {
              headers: {
                crossDomain: true,
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
              },
              // @TODO set auth up to pass/accept jwt_token
              auth: {
                username: 'api_user',
                password: 'api4epa',
              },
            })
            .then(() => {
              console.log('PATCH => success');
            })
            .catch(() => {
              console.log('PATCH => failure');
            });
        }
      },
    },
    beforeCreate() {

    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    },
    mounted() {
      if (this.uid) {
        AppAxios.get(`${this.apiURL}/user/${this.uid}?_format=json`, {
          headers: this.$store.GETHeaders,
          auth: {
            username: 'api_user',
            password: 'api4epa',
          },
        })
          .then((response) => {
            this.favLinksArray = response.data.field_favorite_links;
            this.userInit = response.data.init;
            this.totalRows = this.favLinksArray.length;
          });
      } else {
        this.favLinksArray[0].first = 'Not logged in or no user ID found!';
      }
    },
    props: {
      eepApp: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped
  lang="scss">
  #app {
    margin-bottom: 7rem;
  }

  #favLinks {
    overflow-y: scroll;
    max-height: 100%;
  }

  h2::before {
    height: 50px;
    width: 50px;
    content: url('../../assets/images/bookmark.svg');
  }

  .add-favorite-btn {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #0071c2;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background-size: 1.3rem 1.325rem;
    background-image: url('../../assets/images/favorites-add.svg');
  }

  .edit-favorite-btn {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #0071c2;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background-size: 1.3rem 1.325rem;
    background-image: url('../../assets/images/favorites-edit.svg');
  }

  .delete-favorite-btn {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #0071c2;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background-size: 1.3rem 1.325rem;
    background-image: url('../../assets/images/favorites-empty.svg');
  }
</style>
