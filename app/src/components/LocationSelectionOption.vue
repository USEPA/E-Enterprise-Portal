<template>
    <div id="comp">
        <div class="pt-3 d-flex">
            <b-input-group>
                <label class="col-12 font-weight-bold">
                    Enter city, state; tribe; or ZIP code
                </label>
                <b-form-input id="locationInput" v-model="user.inputBoxText" @keydown.native="submitInput" class="col-4 ml-3"/>
                <div class="col-6 cursor-pointer">
                    <i ref="click-star" @click="starClick" class="fas fa-star"/>
                </div>
            </b-input-group>
        </div>
        <div id="input-box-results-drop-down" class="pt-3 d-flex">
            <b-input-group :style="{display: user.IsAfterInputDropdownDisplayed}">
                <label class="col-12 font-weight-bold">Select a zipcode for {{user.inputBoxText}}</label>
                <b-form-select class="col-4 ml-3" v-model="selectedOption">
                    <template v-for="afterInputOption in user.optionsAfterInput">
                        <template v-if="/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(afterInputOption)">
                            <option>
                                {{afterInputOption}}
                            </option>
                        </template>
                        <template v-else>
                            <option disabled>
                                {{afterInputOption}}
                            </option>
                        </template>
                    </template>
                </b-form-select>
            </b-input-group>
        </div>
        <div class="locations-btn-wrapper pt-2 ml-3" :style="{display: user.IsAfterInputDropdownDisplayed}">
            <button class="usa-button" @click="handleSelectButton">Select</button>
            <button class="usa-button" @click="handleBackButton">Back</button>
        </div>
    </div>
</template>


<script>

    import { mapActions, mapGetters } from 'vuex';
    import { AppWrapper, AppModal, AppPlaceholderContent } from '../modules/wadk/WADK';
    import { EventBus } from '../EventBus';

    const moduleName = 'LocationSelectionOption';

    export default {
        name: moduleName,
        components: {
            AppWrapper,
        },
        beforeCreate() {

        },
        created() {

        },
        data() {
            return {
                inputBoxText: '',
                selectedOption: '',
            };
        },
        mounted() {

        },
        computed: {
           ...mapGetters({
                user: 'getUser',
           }),
        },
        methods: {
           ...mapActions([
           ]),
           starClick() {
               if (this.$refs['click-star'].classList.contains('fas')) {
                  this.$refs['click-star'].classList.remove('fas');
                  this.$refs['click-star'].classList.add('far');
               } else {
                  this.$refs['click-star'].classList.remove('far');
                  this.$refs['click-star'].classList.add('fas');
               }
           },
           submitInput(event){
               if(event.which === 13){
                   this.$store.dispatch('populateDropdownForUserInput', this.inputBoxText);
               }
           },
          handleSelectButton(){
                this.$store.commit('SET_INPUT_BOX_TEXT', this.inputBoxText);
                this.$store.dispatch('handleSelectButtonClickForLocation');

          },
          handleBackButton(){
                this.$store.dispatch('handleBackButtonClickForLocation');
          }
        },
    };
</script>


<style scoped
       lang="scss">
</style>