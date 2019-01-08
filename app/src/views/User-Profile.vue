<template>
  <div class='user-profile'>
    <h3>GET</h3> **Need to run in order to store userObject in state**
    <br>
    <br>
    User ID: <input v-model.number="userID" type="number">
    <br>
    <br>
    <b-btn @click="performDrupalUserGETRequest(userID)">Click to GET Request</b-btn>
    <hr>
    <h3>PATCH</h3>
    Favorite Link Name: <input v-model.text="favoriteLinkName" type="text">
    <br>
    <br>
    Favorite Link URL: <input v-model.url="favoriteLinkURL" type="url">
    <br>
    <br>
    <b-btn @click="performDrupalUserFavLinkPATCHRequest(favoriteLinkName, favoriteLinkURL, userID)">Click to PATCH
      Request
    </b-btn>
    <hr>
    <h3>DELETE</h3>
    Favorite Link Name: <input v-model.text="DELETEfavoriteLinkName" type="text">
    <br>
    <br>
    <b-btn @click="performDrupalUserFavLinkDELETERequest(DELETEfavoriteLinkName, userID)">Click to DELETE Request
    </b-btn>
    <hr>
    <h3>userObject in State: </h3>
    <div id='stateCheck'>{{ userObj }}</div>
    <hr>
    <h3>GET Result: </h3>
    <div id='getResult'></div>
    <hr>
    <h3>PATCH Result: </h3>
    <div id='patchResult'></div>
    <hr>
    <h3>DELETE Result: </h3>
    <div id='deleteResult'></div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  import AppAxios from '../modules/wadk/utils/AppAxios.js';
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';


  export default {
    name: 'User-Profile',
    data() {
      return {
        userID: 0,
        favoriteLinkName: '',
        favoriteLinkURL: '',
        DELETEfavoriteLinkName: '',
      };
    },
    computed: {
      ...mapGetters({
        userObj: 'getUserObject',
        apiURL: 'getEnvironmentApiURL',
      }),
    },
    methods: {
      ...mapActions([
        'setUserObject',
        'setUserObjectFavLinks',
      ]),
      // function that displays successful response
      generateSuccessHTMLOutput(response){
        return  '<h4>Result</h4>' +
          '<h5>Status:</h5> ' +
          '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
          '<h5>Headers:</h5>' +
          '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +
          '<h5>Data:</h5>' +
          '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>'
      },
      // function that displays errorful response
      generateErrorHTMLOutput(error){
        return  '<h4>Result</h4>' +
          '<h5>Message:</h5> ' +
          '<pre>' + error.message + '</pre>' +
          '<h5>Status:</h5> ' +
          '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
          '<h5>Headers:</h5>' +
          '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +
          '<h5>Data:</h5>' +
          '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
      },
      // API GET request function
      performDrupalUserGETRequest(userID){
        const GETResultElement = document.getElementById('getResult');
        const vm = this;
        GETResultElement.innerHTML = '';

        //gets drupal user object
        AppAxios.get(vm.apiURL + '/api/user/' + userID, {
          headers: {
            'crossDomain': true,
            'cache-control': 'no-cache',
            'Content-Type': 'application/hal+json',
          },
        })
          .then(response => {
            console.log('GET => success');
            GETResultElement.innerHTML = vm.generateSuccessHTMLOutput(response);
            vm.setUserObject(response.data[0]);
          })
          .catch(error =>{
            console.log('GET => failure');
            GETResultElement.innerHTML = vm.generateErrorHTMLOutput(error);
          });
      },
      // API DELETE request function
      performDrupalUserFavLinkDELETERequest(DELETEfavoriteLinkName, userID){
        const DELETEResultElement = document.getElementById('deleteResult');
        const vm = this;
        const favLinks = vm.userObj.field_favorite_links;
        console.log(favLinks);
        DELETEResultElement.innerHTML = '';
        let objToDelete = vm.userObj.field_favorite_links.find(fav => {
          return fav.first === DELETEfavoriteLinkName
        });
        let updatedFavLinks = vm.userObj.field_favorite_links.filter(fav => fav !== objToDelete);
        vm.setUserObjectFavLinks(updatedFavLinks);

        // removes favorite link from drupal user object
        AppAxios.patch(vm.apiURL + '/user/' + userID + '?_format=json', {
            field_favorite_links: updatedFavLinks,
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
          .then(response => {
            console.log('DELETE => success');
            DELETEResultElement.innerHTML = vm.generateSuccessHTMLOutput(response);
          })
          .catch(error =>{
            console.log('DELETE => failure');
            console.log(error.response.data);
            DELETEResultElement.innerHTML = vm.generateErrorHTMLOutput(error);
          });
      },
      // API PATCH request function
      performDrupalUserFavLinkPATCHRequest(favoriteLinkName, favoriteLinkURL, userID){
        const PATCHResultElement = document.getElementById('patchResult');
        const vm = this;
        let favLinks ='';
        PATCHResultElement.innerHTML = '';
        /* checks if favLinks exists and adds if needed
        *  save current favorite links, otherwise PATCH will overwrite
        **/
        if (vm.userObj.field_favorite_links){
          vm.userObj.field_favorite_links
            .push(
              { "first": favoriteLinkName, "second": favoriteLinkURL }
            );
        }
        else {
          vm.userObj.field_favorite_links = [
            {
            "first": favoriteLinkName,
            "second": favoriteLinkURL
            }
          ];
        }
        favLinks = vm.userObj.field_favorite_links;

        vm.setUserObjectFavLinks(favLinks);
        // updates favorite links drupal user object
        AppAxios.patch(vm.apiURL + '/user/' + userID + '?_format=json', {
            field_favorite_links: vm.userObj.field_favorite_links,
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
          .then(response => {
            console.log('PATCH => success');
            PATCHResultElement.innerHTML = vm.generateSuccessHTMLOutput(response);
          })
          .catch(error =>{
            console.log('PATCH => failure');
            console.log(error.response.data);
            PATCHResultElement.innerHTML = vm.generateErrorHTMLOutput(error);
          });
      },
    },
  };
</script>

<style scoped>

</style>