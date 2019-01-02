<template>
  <div class='user-profile'>
    <input v-model.number="userID" type="number">
    <b-btn @click="performDrupalUserGETRequest(userID)">Click to Request</b-btn>
    <div id='getResult'></div>
    <div id='stateCheck'>{{ userObj }}</div>
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
      ]),
      // function that displays GET successful response
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
      // function that displays GET error response
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
      performDrupalUserGETRequest(userID){
        const resultElement = document.getElementById('getResult');
        const vm = this;
        const stateCheck = document.getElementById('stateCheck');
        stateCheck.innerHTL = 'state not yet set';
        resultElement.innerHTML = '';

        //gets drupal user object
        AppAxios.get('http://e-enterprise/api/user/'+userID, {
          headers: {
            'crossDomain': true,
            'cache-control': 'no-cache',
            'Content-Type': 'application/hal+json',
          },
        })
          .then((response) => {
            console.log('success');
            resultElement.innerHTML = vm.generateSuccessHTMLOutput(response);
            vm.setUserObject(response.data[0]);
            stateCheck.innerHTL = vm.userObj;
          })
          .catch((error) =>{
            console.log('failure');
            resultElement.innerHTML = vm.generateErrorHTMLOutput(error);
          });
      },
    },
  };
</script>

<style scoped>

</style>