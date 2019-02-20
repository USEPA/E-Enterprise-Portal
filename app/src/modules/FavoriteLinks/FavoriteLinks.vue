<template ref="favoriteLinks">
  <div>
    <AppWrapper
      :eep-app="eepApp">
      <div v-html="eepApp.field_html_content.mainCard"/>
      <b-row>
        <b-col
          md="4"
          class="my-1 favorite-links-filter">
          <b-form-group
            horizontal
            label="Filter"
            label-for="filter-results"
            class="mb-2">
            <b-input-group>
              <b-form-input
                id="filter-results"
                aria-controls="favorite-links-table"
                v-model="filter"/>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col
          md="4"
          class="my-1 add-fav-column">
          <b-btn
            title="Add a Favorite"
            id="add-favorite"
            @click="openAddModal"
            class="add-favorite-btn"/>
          <label
            for="add-favorite"
            class="d-inline-block pl-1 add-favorite-btn-text">Add a Favorite</label>
        </b-col>
        <b-col
          md="4"
          class="my-1 pr-4 pl-0 favorite-links-rows-column">
          <b-form-group
            horizontal
            label="Rows"
            label-for="row-results"
            class="mb-2">
            <b-form-select
              aria-controls="favorite-links-table"
              id="row-results"
              :options="pageOptions"
              v-model="perPage"
              class="float-right ml-3"/>
          </b-form-group>
        </b-col>
      </b-row>

      <!--datatable-->
      <b-table
        hover
        id="favorite-links-table"
        class="bootstrap-vue-table-fav-scroll"
        thead-class="thead-fav-fixed"
        tbody-class="tbody-fav-scroll"
        :items="favoriteLinks"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered">

        <template
          slot="first"
          slot-scope="data">
          <a
            :href="data.item.second"
            class="pl-2">{{ data.item.first }}</a>
        </template>

        <template
          slot="actions"
          slot-scope="row">
          <b-button
            title="Delete Favorite"
            size="sm"
            @click="deleteFavLink(row.item, row.index)"
            class="delete-favorite-btn mr-1"/>
          <b-button
            title="Edit Favorite"
            size="sm"
            @click="openEditModal(row.item, row.index, $event.target)"
            class="edit-favorite-btn mr-1"/>
        </template>
        <template
          v-if='!favoriteLinksLoaded'>
          <p>Loading you Favorites...</p>
        </template>

      </b-table>

      <!-- add modal -->
      <AppModal
        id="addModalInfo"
        modal-ref="addModalInfo"
        hide-footer
        :title="addModalInfo.title">
        <b-form
          id="addModalInfoForm"
          class="needs-validation"
          @submit="applyAddModal"
          novalidated>
          <label>Title
          </label>
          <b-form-input
            type="text"
            v-model="addModalInfo.first"
            required/>
          <label>Website Address (URL)
          </label>
          <b-form-input
            type="url"
            v-model="addModalInfo.second"
            required/>
          <b-btn
            class="mt-3"
            variant="primary"
            type="submit">
            save
          </b-btn>
        </b-form>

      </AppModal>

      <!-- edit modal -->
      <AppModal
        id="editModalInfo"
        modal-ref="editModalInfo"
        hide-footer
        :title="editModalInfo.title">
        <b-form
          id="editModalInfoForm"
          class="needs-validation"
          @submit="applyEditModal"
          novalidated>
          <label>Title
          </label>
          <b-form-input
            type="text"
            v-model="editModalInfo.first"
            required/>
          <label>Website Address (URL)
          </label>
          <b-form-input
            type="url"
            v-model="editModalInfo.second"
            required/>
          <b-btn
            class="mt-3"
            variant="primary"
            type="submit">
            save
          </b-btn>
        </b-form>

      </AppModal>

      <!--if No Favorites-->
      <div v-if="(favoriteLinks.length === 0 && favoriteLinksLoaded)">{{ noFavs }}</div>

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
  import { mapGetters, mapActions } from 'vuex';
  import { AppWrapper, AppPlaceholderContent, AppModal } from '../wadk/WADK';
  import storeModule from './store/index';

  const moduleName = 'FavoriteLinks';

  export default {
    name: moduleName,
    components: {
      AppWrapper,
      AppPlaceholderContent,
      AppModal,
    },
    data() {
      return {
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
        getUser: 'getUser',
      }),
      favoriteLinks: {
        get() {
          return this.getUser.favoriteLinks;
        },
      },
      favoriteLinksLoaded: {
        get() {
          return this.getUser.userLoaded;
        },
      },
      userInit: {
        get() {
          return this.getUser.init;
        },
      },
    },
    methods: {
      ...mapActions([
        'apiUserPatch',
      ]),
      ...mapActions(moduleName, [
        'addFavoriteLink',
      ]),
      // ADD
      openAddModal(item, index, button) {
        this.$root.$emit('bv::show::modal', 'addModalInfo', button);
      },
      closeAddModal() {
        this.$root.$emit('bv::hide::modal', 'addModalInfo');
      },
      applyAddModal(evt) {
        evt.preventDefault();
        // stores changes in local state
        const favoriteLinkName = this.addModalInfo.first.trim();
        const favoriteLinkURL = this.addModalInfo.second.trim();
        this.addFavoriteLink(
          {
            first: favoriteLinkName,
            second: favoriteLinkURL,
          },
        );
        this.applyChangesToFavoriteLinks();
        this.closeAddModal();
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
      setEditModalIndex() {
        for (let i = 0; i < this.favoriteLinks.length; i++) {
          if (this.favoriteLinks[i].first === this.editModalInfo.first && this.favoriteLinks[i].second === this.editModalInfo.second) {
            this.editModalIndex = i;
          }
        }
      },
      makeEditChangesToState() {
        this.favoriteLinks[this.editModalIndex].first = this.editModalInfo.first.trim();
        this.favoriteLinks[this.editModalIndex].second = this.editModalInfo.second.trim();
      },
      applyEditModal(evt) {
        evt.preventDefault();
        this.setEditModalIndex();
        this.makeEditChangesToState();
        this.applyChangesToFavoriteLinks();
        this.closeEditModal();
      },
      // DELETE
      deleteFavLink(item, index) {
        this.favoriteLinks.splice(index, 1);
        this.applyChangesToFavoriteLinks();
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      applyChangesToFavoriteLinks() {
        this.apiUserPatch({
          field_favorite_links: this.favoriteLinks,
        });
      },
    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
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
  @import "../../styles/favorite-links";
  /* To import images */
  h2::before {
    content: url('../../assets/images/bookmark.svg');
  }

  .add-favorite-btn {
    background-image: url('../../assets/images/favorites-add.svg');
  }

  .edit-favorite-btn {
    background-image: url('../../assets/images/favorites-edit.svg');
  }

  .delete-favorite-btn {
    background-image: url('../../assets/images/favorites-empty.svg');
  }
  /* Fixes bottom of workbench grey area */
  #app {
    margin-bottom: 7rem;
  }
</style>

