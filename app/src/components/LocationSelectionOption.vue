<template>
    <div id="comp">
        <div class="pt-3 d-flex">
            <b-input-group>
                <label class="col-12 font-weight-bold">
                    Enter city, state; tribe; or ZIP code
                </label>
                <b-form-input id="locationInput" v-model="inputBoxText" @keydown.native="submitInput" class="col-4 ml-3"/>
                <div class="col-6 cursor-pointer">
                    <i ref="click-star" @click="starClick" class="fas fa-star"/>
                </div>
            </b-input-group>
        </div>
        <div id="input-box-results-drop-down" class="pt-3 d-flex">
            <b-input-group :style="{display: user.IsAfterInputDropdownDisplayed}">
                <label class="col-12 font-weight-bold">Select a zipcode for {{user.inputBoxTextAfterSubmit}}</label>
                <b-form-select class="col-4 ml-3">
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
    </div>
</template>


<script>


</script>

<style scoped
       lang="scss">
</style>