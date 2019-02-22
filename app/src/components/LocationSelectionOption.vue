<template>
    <div id="comp">
        <div class="pt-3 d-flex">
            <b-input-group :style="{display: user.IsMainInputDisplayed}">
                <label class="col-12 font-weight-bold">
                    Enter city, state; tribe; or ZIP code
                </label>
                <b-form-input id="locationInput" v-model="user.inputBoxText" @keydown.native="submitInput" class="col-4 ml-3"/>
            </b-input-group>
        </div>
        <div id="input-box-results-drop-down" class="pt-3 d-flex">
            <b-input-group :style="{display: user.IsAfterInputDropdownDisplayed}">
                <label class="col-12 font-weight-bold">{{user.dropDownLabel}} {{user.inputBoxText}}</label>
                <b-form-select class="col-4 ml-3" v-model="user.dropDownSelection">
                    <template v-for="afterInputOption in user.optionsAfterInput">
                        <template v-if="isValidLocation(afterInputOption)">
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
        <div class="locations-btn-wrapper pt-2 ml-3 pb-3" :style="{display: user.IsAfterInputDropdownDisplayed}">
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
           submitInput(event){
               if(event.which === 13 &&
                   this.$store.getters.getUser.inputBoxText != ''){
                   this.$store.dispatch('populateDropdownForUserInput', this.inputBoxText);
               }
           },
          handleSelectButton(){
                if(this.$store.getters.getUser.inputBoxText != '' &&
                        this.$store.getters.getUser.dropDownSelection != ''){
                    this.$store.commit('ITERATE_FIRST_TIME_SELECT_BUTTON', 1);
                    this.$store.dispatch('handleSelectButtonClickForLocation');
                    this.$store.commit('SET_DISPLAY_WHEN_LOCATION_IS_CLICKED', '');
                }
           },
          handleBackButton(){
                this.$store.dispatch('handleBackButtonClickForLocation');
          },
          isValidLocation(afterInputOption){
                let isValid = false;
                if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(afterInputOption) ||
                        /[A-Z][a-zA-Z]+,[ ]?[A-Z]{2}/.test(afterInputOption)){
                    isValid = true;
                }
                return isValid;
          },
        },
    };
</script>


<style scoped
       lang="scss">
</style>