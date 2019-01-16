<template ref="favoriteLinks">
    <div id="favLinks">
        <AppWrapper
          v-if="(favLinksArray.length > 0 && eepApp.title)"
        :eep-app="eepApp">
          <div v-html="eepApp.html.mainCard"></div>
          <b-row>
            <b-col md="12" class="my-1">
              <b-btn @click="openAddModal" class="add-favorite-btn"></b-btn><p class="d-inline-block pl-2">Add a Favorite</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="7" class="my-1">
              <b-form-group horizontal label="Filter" class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search" />
                  <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="5" class="my-1">
              <b-form-group horizontal label="Rows" class="mb-0">
                <b-form-select :options="pageOptions" v-model="perPage" />
              </b-form-group>
            </b-col>
          </b-row>
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

            <template slot="first" slot-scope="data">
              <span class="fa fa-heart filled" aria-hidden="true"></span>
              <a :href="data.item.second" class="pl-2">{{data.item.first}}</a>
            </template>

            <template slot="actions" slot-scope="row" >
              <b-button size="sm" @click="deleteFavLink(row.item, row.index)" class="delete-favorite-btn mr-1"></b-button>
              <b-button size="sm" @click="openEditModal(row.item, row.index, $event.target)" class="edit-favorite-btn mr-1"></b-button>
            </template>

          </b-table>

          <!-- add modal -->
          <b-modal id="addModalInfo" @hide="applyAddModal" hide-footer :title="addModalInfo.title">
            <b-row>
              <b-col md="12" class="my-1">Title</b-col>
              <b-col md="12" class="my-1"><b-input v-model="addModalInfo.first"></b-input></b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="my-1">Website Address (URL)</b-col>
              <b-col md="12" class="my-1"><b-input v-model="addModalInfo.second"></b-input></b-col>
            </b-row>
            <b-btn class="mt-3" @click="closeAddModal">save</b-btn>

          </b-modal>

          <!-- edit modal -->
          <b-modal id="editModalInfo" @hide="applyEditModal(editModalInfo.first, editModalInfo.second)" hide-footer :title="editModalInfo.title">
            <b-row>
              <b-col md="12" class="my-1">Title</b-col>
              <b-col md="12" class="my-1"><b-input v-model="editModalInfo.first"></b-input></b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="my-1">Website Address (URL)</b-col>
              <b-col md="12" class="my-1"><b-input v-model="editModalInfo.second"></b-input></b-col>
            </b-row>
            <b-btn class="mt-3" @click="closeEditModal">save</b-btn>

          </b-modal>

          <b-row class="text-center">
            <b-col md="12" class="my-1">
              <b-pagination align="center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
          </b-row>

        </AppWrapper>
      <AppPlaceholderContent
        v-if="!(favLinksArray.length > 0)"
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
  import AppAxios from 'axios';
  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
  import storeModule from './store/index';
  import { EventBus } from '../../EventBus';

  const moduleName = 'FavoriteLinks';

  export default {
        name: moduleName,
        components: {
          AppWrapper,
          AppPlaceholderContent,
        },
        beforeCreate(){
          AppAxios.get('http://e-enterprise/api/user/1?_format=json', {
            headers: this.$store.GETHeaders,
            auth: {
              username: 'api_user',
              password: 'api4epa',
            }
          })
            .then(response => {
              this.favLinksArray = response.data[0].field_favorite_links;
            })
        },
        created(){
            const store = this.$store;
            if (!(store && store.state && store.state[moduleName])) {
                store.registerModule(moduleName, storeModule);
            }

        },
        data() {
          return {
            eepApp: {
              id: 'favorite-links',
              title: 'Favorite Links',
              source: {
                text: 'US Environmental Protection Agency',
                link: 'https://www.epa.gov',
              },
              html: {
                mainCard:
                  ' <p>Save links you find in E-Enterprise to return to them later.</p>'
              },
            },
            favLinksArray: [],
            fields: [
              { key: 'first', label: 'Link', sortable: true, sortDirection: 'desc' },
              { key: 'widget', label: 'Widget', sortable: true, sortDirection: 'desc' },
              { key: 'actions', label: 'Actions', sortable: true, sortDirection: 'desc', 'class': 'text-right' },
            ],
            currentPage: 1,
            perPage: 5,
            pageOptions: [ 5, 10, 15 ],
            sortBy: null,
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            editModalInfo: { title: '', first: '', second: '' },
            editModalIndex: null,
            addModalInfo: { title: '', first: 'Link Name Here', second: 'URL Here' },
          }
        },
        mounted () {

      },
        computed:{
          ...mapGetters({
            authenticated: 'getUserAuthentication',
            bridgeURL: 'getBridgeURL',
            username: 'getUserFullName',
          }),
          sortOptions () {
            // Create an options list from our fields
            return this.fields
              .filter(f => f.sortable)
              .map(f => { return { text: f.label, value: f.key } });
          },
          totalRows: {
            get: function () {
              return this.favLinksArray.length;
            },
            set: function () {
              return this.favLinksArray.length;
            }
          }
        },
        methods: {
          ...mapActions(moduleName, [
          ]),
          // ADD
          openAddModal(item, index, button) {
            this.addModalInfo.title = `Add Favorite`;
            this.$root.$emit('bv::show::modal', 'addModalInfo', button);
          },
          closeAddModal(){
            this.$root.$emit('bv::hide::modal', 'addModalInfo');
          },
          applyAddModal(){
            // stores changes in local state
            this.favLinksArray = this.favLinksArray.concat(
              {
                "first": this.addModalInfo.first,
                "second": this.addModalInfo.second,
              }
            );
            // pushes changes to backend
            AppAxios.patch('http://e-enterprise/user/1?_format=json', {
                field_favorite_links: this.favLinksArray,
              },
              {
                headers: {
                  'crossDomain': true,
                  'cache-control': 'no-cache',
                  'Content-Type': 'application/json',
                },
                auth: {
                  username: 'api_user',
                  password: 'api4epa',
                },
              })
              .then(() => {
                console.log('PATCH => success');
              })
              .catch(() =>{
                console.log('PATCH => failure');
              });
          },
          // EDIT
          openEditModal(item, index, button) {
            this.editModalInfo.title = `Edit Favorite`;
            this.editModalIndex = index;
            this.editModalInfo.first = item.first;
            this.editModalInfo.second = item.second;
            this.$root.$emit('bv::show::modal', 'editModalInfo', button);
          },
          closeEditModal() {
            this.$root.$emit('bv::hide::modal', 'editModalInfo');
          },
          applyEditModal(objTitle, objLink){
            for (let i = 0; i < this.favLinksArray.length; i++) {
              if (this.favLinksArray[i]['first'] === objTitle && this.favLinksArray[i]['second'] === objLink) {
                this.editModalIndex = i;
              }
            }
            // stores changes in local state
            this.favLinksArray[this.editModalIndex]['first'] = this.editModalInfo.first;
            this.favLinksArray[this.editModalIndex]['second'] = this.editModalInfo.second;
            // pushes changes to backend
            AppAxios.patch('http://e-enterprise/user/1?_format=json', {
                field_favorite_links: this.favLinksArray,
              },
              {
                headers: {
                  'crossDomain': true,
                  'cache-control': 'no-cache',
                  'Content-Type': 'application/json',
                },
                auth: {
                  username: 'api_user',
                  password: 'api4epa',
                },
              })
                .then(() => {
                  console.log('PATCH => success');
                })
                .catch(() =>{
                  console.log('PATCH => failure');
                });
          },
          // DELETE
          deleteFavLink(item, index) {
            console.log(this.favLinksArray);
            this.favLinksArray.splice(index,1);
            console.log(this.favLinksArray);

            AppAxios.patch('http://e-enterprise/user/1?_format=json', {
                field_favorite_links: this.favLinksArray,
              },
              {
                headers: {
                  'crossDomain': true,
                  'cache-control': 'no-cache',
                  'Content-Type': 'application/json',
                },
                auth: {
                  username: 'api_user',
                  password: 'api4epa',
                },
              })
                .then(() => {
                  console.log('PATCH => success');
                })
                .catch(() =>{
                  console.log('PATCH => failure');
                });
          },
          onFiltered (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
          }
        }
    }
</script>

<style scoped
  lang="scss">
  #app{
    margin-bottom: 7rem;
  }
  #favLinks {
    overflow-y: scroll;
    max-height: 100%;
  }
  h2::before {
    height:50px;
    width: 50px;
    content: url('../../assets/images/bookmark.svg');
  }
  .add-favorite-btn {
    background-repeat:no-repeat;
    background-position:center center;
    background-color:#0071c2;
    width:2.2rem;
    height:2.2rem;
    border-radius:50%;
    background-size: 1.3rem 1.325rem;
    background-image:url('../../assets/images/favorites-add.svg');
  }
  .edit-favorite-btn {
    background-repeat:no-repeat;
    background-position:center center;
    background-color:#0071c2;
    width:2.2rem;
    height:2.2rem;
    border-radius:50%;
    background-size: 1.3rem 1.325rem;
    background-image:url('../../assets/images/favorites-edit.svg');
  }
  .delete-favorite-btn {
    background-repeat:no-repeat;
    background-position:center center;
    background-color:#0071c2;
    width:2.2rem;
    height:2.2rem;
    border-radius:50%;
    background-size: 1.3rem 1.325rem;
    background-image:url('../../assets/images/favorites-empty.svg');
  }
  .fa-heart::before{
    display: none;
  }
  .fa-heart {
    background: transparent url('../../assets/images/heart-filled.svg') no-repeat 50% 50%;
    background-size: 1.2rem,contain;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    vertical-align: bottom;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
</style>