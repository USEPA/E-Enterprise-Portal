<!-- get the button call back to call the axios function in actions.js-->
<template>
    <div id="location-wrapper" class="col-6">
        <b-input-group>
            <b-form-input id="location-input" type="text" v-model="location"
                          placeholder="Enter city, state; or ZIP code"></b-form-input>
            <b-input-group-append>
                <b-button id="submit-location" v-on:click="submitLocation">
                    <div class="button-image">Go</div> <!-- @TODO: make the background image an arrow get from kate -->
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default{
        data: function() {
            return{
                location: ""
            }
        },
        methods: {
            ...mapActions(name, [
                        'createLocationRequest'
                    ]
            ),
            submitLocation(){
                alert(this.location);
            }
        }
    }
</script>

<style>
</style>


