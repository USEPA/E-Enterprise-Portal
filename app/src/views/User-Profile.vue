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
    <b-btn @click="performDrupalUserFavLinkPATCHRequest(favoriteLinkName, favoriteLinkURL, userID)">Click to PATCH Request</b-btn>
    <hr>
    <h3>DELETE</h3>
    Favorite Link Name: <input v-model.text="DELETEfavoriteLinkName" type="text">
    <br>
    <br>
    <b-btn @click="performDrupalUserFavLinkDELETERequest(DELETEfavoriteLinkName, userID)">Click to DELETE Request</b-btn>
    <hr>
    State Check: <div id='stateCheck'>{{ userObj }}</div>
    <hr>
    GET Result: <div id='getResult'></div>
    <hr>
    PATCH Result: <div id='patchResult'></div>
    <hr>
    DELETE Result: <div id='deleteResult'></div>
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
      }),
    },
    methods: {
      ...mapActions([
        'setUserObject',
        'setUserObjectFavLinks'
      ]),
      // function that displays successful response
      generateSuccessHTMLOutput(response){
        return  '<h4>Result</h4>' +
          '<h5>Status:</h5> ' +
          '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
          '<h5>Headers:</h5>' +
          '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +
          '<h5>Data:</h5>' +
          '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>' +
          '<pre>' + JSON.stringify(response.data[0].field_favorite_links, null, '\t') + '</pre>';
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
        AppAxios.get('http://e-enterprise/api/user/'+userID, {
          headers: {
            'crossDomain': true,
            'cache-control': 'no-cache',
            'Content-Type': 'application/hal+json',
          },
        })
          .then((response) => {
            console.log('GET => success');
            GETResultElement.innerHTML = vm.generateSuccessHTMLOutput(response);
            vm.setUserObject(response.data[0]);
          })
          .catch((error) =>{
            console.log('GET => failure');
            GETResultElement.innerHTML = vm.generateErrorHTMLOutput(error);
          });
      },
      // API DELETE request function
      performDrupalUserFavLinkDELETERequest(DELETEfavoriteLinkName, userID){
        const DELETEResultElement = document.getElementById('deleteResult');
        const vm = this;
        const GETfavLinks = vm.userObj.field_favorite_links;
        console.log(GETfavLinks);
        DELETEResultElement.innerHTML = '';

        //gets drupal user object
        AppAxios.delete('http://e-enterprise/user/'+userID+'?_format=json', {
          headers: {
            'crossDomain': true,
            'cache-control': 'no-cache',
            'Content-Type': 'application/hal+json',
          },
          body: {
            field_favorite_links: {first: DELETEfavoriteLinkName}
          },
          withCredentials: true,
          auth: {
            username: 'cgi-old-admin',
            password: 'c9iee43pa',
          },
        })
          .then((response) => {
            console.log('DELETE => success');
            DELETEResultElement.innerHTML = vm.generateSuccessHTMLOutput(response);
          })
          .catch((error) =>{
            console.log('DELETE => failure');
            DELETEResultElement.innerHTML = vm.generateErrorHTMLOutput(error);
          });
      },
      // API PATCH request function
      performDrupalUserFavLinkPATCHRequest(favoriteLinkName, favoriteLinkURL, userID){
        const PATCHResultElement = document.getElementById('patchResult');
        const vm = this;
        PATCHResultElement.innerHTML = '';
        // GET request to save current favorite links, otherwise PATCH will overwrite
        const GETfavLinks = vm.userObj.field_favorite_links;
        console.log(GETfavLinks);
        GETfavLinks
          .push(
            { "first": favoriteLinkName, "second": favoriteLinkURL }
          );
        vm.setUserObjectFavLinks(GETfavLinks);
        console.log(vm.userObj.field_favorite_links);
        //updates drupal user object
        AppAxios.patch('http://e-enterprise/user/'+userID+'?_format=hal_json', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'crossDomain': true,
            'cache-control': 'no-cache',
            'Content-Type': 'application/hal+json',
          },
          data: {
            "_links": {
              "self": {
                "href": "http://e-enterprise/user/1?_format=hal_json"
              },
              "type": {
                "href": "http://e-enterprise/rest/type/user/user"
              }
            },
            "field_favorite_links": vm.userObj.field_favorite_links,
          },
          withCredentials: true,
          auth: {
            username: 'cgi-old-admin',
            password: 'c9iee43pa',
          },
        })
          .then((response) => {
            console.log('PATCH => success');
            PATCHResultElement.innerHTML = vm.generateSuccessHTMLOutput(response);
          })
          .catch((error) =>{
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