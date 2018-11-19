<template ref="moduleTemplate">
    <div>
        <AppWrapper
        :eep-app="eepApp">
            <!-- Here is where all of the content goes for the trending air app -->
        </AppWrapper>
    </div>
</template>


<script>

    import { mapActions, mapGetters } from 'vuex';
    import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
    import storeModule from './store/index';
    import { EventBus } from '../../EventBus';

    const name = 'ModuleTemplate';

    export default {
        name: name,
        components: {
            AppWrapper,
        },
        beforeCreate(){

        },
        created(){

        },
        data(){
            return{
                eepApp: {
                    id: 'module-template',
                    title: 'Module Template',
                    source: {
                        text: '',
                        link: '',
                    },
                    html: {
                        mainCard: '',
                    },
                },
            }
        },
        computed:{},
        methods: {}
    }


</script>


<style scoped
       lang="scss">
</style>